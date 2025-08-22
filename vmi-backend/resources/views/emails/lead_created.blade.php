@component('mail::message')
# {{ $lead->type === 'contact' ? 'Связаться с менеджером' : 'Оставить заявку' }}

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

Спасибо,
{{ config('app.name') }}
@endcomponent
