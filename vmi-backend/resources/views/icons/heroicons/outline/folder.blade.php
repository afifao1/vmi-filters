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
          d="M2.75 9.5V7A2.25 2.25 0 0 1 5 4.75h4.25l2 2H19A2.25 2.25 0 0 1 21.25 9v8A2.25 2.25 0 0 1 19 19.25H5A2.25 2.25 0 0 1 2.75 17V9.5z"/>
</svg>
