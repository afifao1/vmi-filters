<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;

class CertificateController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Certificate::query()
            ->orderByDesc('issued_at')
            ->orderByDesc('id')
            ->get(['id','title','image','description','issued_at']);

        return response()->json($items);
    }
}
