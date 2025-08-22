<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Lead $lead)
    {
        //
    }


    public function envelope(): Envelope
    {
        $subject = $this->lead->type === 'contact'
            ? 'Связаться с менеджером #' . $this->lead->id
            : 'Оставить заявку #' . $this->lead->id;

        return new Envelope(
            subject: $subject,
            from: new Address(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME', 'VMI')),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.lead_created',
            with: ['lead' => $this->lead],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
