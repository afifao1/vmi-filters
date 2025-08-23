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
          d="M3.75 13.5l2.25-6.75h12l2.25 6.75M3.75 13.5h4.5a3 3 0 0 0 6 0h4.5M3.75 13.5V18A1.5 1.5 0 0 0 5.25 19.5h13.5A1.5 1.5 0 0 0 20.25 18v-4.5"/>
</svg>
