<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Mail\LeadCreatedMail;
use App\Models\Lead;
use App\Services\TelegramService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendLeadNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 15;

    public function __construct(public Lead $lead) {}

    public function handle(TelegramService $telegram): void
    {
        // 1) Email (не валим джобу, если почта недоступна)
        $to = env('SALES_TO');
        if (!empty($to)) {
            try {
                Mail::to($to)->send(new LeadCreatedMail($this->lead));
            } catch (\Throwable $ex) {
                Log::error('Mail send failed', [
                    'to' => $to,
                    'error' => $ex->getMessage(),
                ]);
                // продолжаем — телеграм отправим в любом случае
            }
        } else {
            Log::warning('SALES_TO is empty, skipping email notification.');
        }

        // 2) Telegram (как договорились: разные заголовки, без URL, Ташкент)
        $title = $this->lead->type === 'product'
            ? '🛒 <b>Заявка на товар</b>'
            : '📞 <b>Связаться с менеджером</b>';

        $tz = config('app.timezone', 'UTC');
        $timeLocal = now()->setTimezone($tz)->format('d.m.Y H:i');

        $lines = [
            $title,
            '',
            '<b>Тип:</b> ' . e($this->lead->type),
            '<b>Имя:</b> ' . e($this->lead->name),
            '<b>Телефон:</b> ' . e($this->lead->phone),
            '<b>Email:</b> ' . e($this->lead->email),
        ];
        if ($this->lead->message) {
            $lines[] = '<b>Сообщение:</b> ' . e($this->lead->message);
        }
        if ($this->lead->product_title) {
            $qty = (int)($this->lead->quantity ?? 1);
            $lines[] = '🧩 <b>Товар:</b> ' . e($this->lead->product_title) . ' × ' . $qty;
        }
        // Источник и URL — убраны по твоей просьбе
        $lines[] = '🕒 ' . $timeLocal . ' (Ташкент)';

        $telegram->send(implode("\n", $lines));
    }

    public function failed(\Throwable $e): void
    {
        Log::error('SendLeadNotifications failed', [
            'lead_id' => $this->lead->id ?? null,
            'error'   => $e->getMessage(),
        ]);
    }
}
