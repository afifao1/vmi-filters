<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LeadCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Lead $lead) {}

    public function build()
    {
        return $this->subject('Новая заявка #' . $this->lead->id)
            ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME', 'VMI'))
            ->markdown('emails.lead_created', ['lead' => $this->lead]);
    }
}
