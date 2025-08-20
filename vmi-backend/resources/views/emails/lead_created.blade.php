@component('mail::message')
# Новая заявка

**Тип:** {{ $lead->type }}

**Имя:** {{ $lead->name }}

**Телефон:** {{ $lead->phone }}

**Email:** {{ $lead->email }}

@isset($lead->message)
**Сообщение:** {{ $lead->message }}
@endisset

@isset($lead->product_title)
**Товар:** {{ $lead->product_title }} × {{ (int)($lead->quantity ?? 1) }}
@endisset

@isset($lead->source)
**Источник:** {{ $lead->source }}
@endisset

@isset($lead->source_url)
**URL:** {{ $lead->source_url }}
@endisset

@component('mail::panel')
ID: {{ $lead->id }}
IP: {{ $lead->ip }}
User-Agent: {{ Str::limit($lead->user_agent, 120) }}
@endcomponent

Спасибо,
{{ config('app.name') }}
@endcomponent
