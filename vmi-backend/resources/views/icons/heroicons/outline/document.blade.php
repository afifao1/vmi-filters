@props(['class' => 'w-5 h-5'])
<svg {{ $attributes->merge([
    'class' => $class,
    'xmlns' => 'http://www.w3.org/2000/svg',
    'viewBox' => '0 0 24 24',
    'fill' => 'none',
    'stroke' => 'currentColor',
    'stroke-width' => '1.5',
]) }}>
    <rect x="6.75" y="3.75" width="10.5" height="16.5" rx="1.5"/>
    <path stroke-linecap="round" d="M9 9.75h6M9 13.5h6M9 17.25h6"/>
</svg>
