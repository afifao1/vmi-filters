<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = Product::query()->where('is_active', true);

        if ($request->filled('type')) {
            $q->whereIn('type', (array) $request->input('type'));
        }

        if ($request->filled('status')) {
            $q->whereIn('status', (array) $request->input('status'));
        }

        if ($request->filled('brand_id')) {
            $q->where('brand_id', (int) $request->input('brand_id'));
        }

        if ($request->filled('manufacturer')) {
            $q->where('manufacturer', $request->string('manufacturer'));
        }

        if ($request->filled('power_min') || $request->filled('power_max')) {
            $min = (int) $request->input('power_min', 0);
            $max = (int) $request->input('power_max', PHP_INT_MAX);
            $q->whereBetween('power', [$min, $max]);
        }

        $q->orderByDesc('popularity')->orderBy('id','desc');

        $items = $q->get([
            'id','title','manufacturer','status','type','power','img','popularity','slug','brand_id',
        ]);

        return response()->json($items);
    }
}
