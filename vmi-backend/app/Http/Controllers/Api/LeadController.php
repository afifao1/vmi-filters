<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Jobs\SendLeadNotifications;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $meta = [
                'ip'           => $request->ip(),
                'user_agent'   => substr((string)$request->userAgent(), 0, 1000),
                'referer'      => (string)$request->header('referer'),
                'headers'      => [
                    'accept'           => $request->header('accept'),
                    'accept-language'  => $request->header('accept-language'),
                    'origin'           => $request->header('origin'),
                    'user-agent'       => $request->header('user-agent'),
                ],
                'created_at' => now()->toISOString(),
            ];

            $lead = Lead::create([
                'type'          => $validated['type'],
                'name'          => $validated['name'],
                'phone'         => $validated['phone'],
                'email'         => $validated['email'],
                'message'       => $validated['message'] ?? null,
                'product_id'    => $validated['product_id'] ?? null,
                'product_title' => $validated['product_title'] ?? null,
                'quantity'      => $validated['quantity'] ?? 1,
                'source'        => $validated['source'] ?? null,
                'source_url'    => $validated['source_url'] ?? null,
                'ip'            => $request->ip(),
                'user_agent'    => substr((string)$request->userAgent(), 0, 1000),
                'meta'          => $meta,
            ]);

            SendLeadNotifications::dispatch($lead)->onQueue('default');
            Log::info('Lead created', ['lead_id' => $lead->id, 'type' => $lead->type]);

            return response()->json(['ok' => true, 'id' => $lead->id], 201);
        } catch (\Throwable $e) {
            Log::error('Failed to create lead', ['error' => $e->getMessage()]);
            return response()->json(['ok' => false, 'message' => 'Unable to create lead.'], 500);
        }
    }
}
