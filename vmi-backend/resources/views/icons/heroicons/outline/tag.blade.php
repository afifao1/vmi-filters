@props(['class' => 'w-5 h-5'])
<svg {{ $attributes->merge([
    'class' => $class,
    'xmlns' => 'http://www.w3.org/2000/svg',
    'viewBox' => '0 0 24 24',
    'fill' => 'none',
    'stroke' => 'currentColor',
    'stroke-width' => '1.5',
]) }}>
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M7.5 3.75H4.5a.75.75 0 0 0-.75.75v3c0 .4.16.78.44 1.06l9 9a1.5 1.5 0 0 0 2.12 0l3-3a1.5 1.5 0 0 0 0-2.12l-9-9A1.5 1.5 0 0 0 7.5 3.75z"/>
    <circle cx="6.75" cy="6.75" r="0.75"/>
</svg>
