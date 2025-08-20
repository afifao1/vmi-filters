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

    /** @var int максимальное число попыток */
    public int $tries = 3;

    /** @var int таймаут задачи (сек) */
    public int $timeout = 15;

    public function __construct(public Lead $lead) {}

    public function handle(TelegramService $telegram): void
    {
        // Email (в dev при MAIL_MAILER=log уйдет в storage/logs/laravel.log)
        $to = env('SALES_TO');
        if (!empty($to)) {
            Mail::to($to)->send(new LeadCreatedMail($this->lead));
        } else {
            Log::warning('SALES_TO is empty, skipping email notification.');
        }

        // Заголовок по типу
        $title = $this->lead->type === 'product'
            ? '🛒 <b>Заявка на товар</b>'
            : '📞 <b>Связаться с менеджером</b>';

        // Часовой пояс для часов — из конфигурации (см. APP_TIMEZONE)
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
        if ($this->lead->source) {
            $lines[] = '🧭 <b>Источник:</b> ' . e($this->lead->source);
        }

        // URL убран по просьбе
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
