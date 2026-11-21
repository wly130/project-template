<?php

namespace App\Http\Controllers\Items;

use App\Repositories\Items\ItemStore;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final class ItemController
{
    public function __construct(private ItemStore $store)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json($this->store->list());
    }

    public function show(int $item): JsonResponse
    {
        $result = $this->store->get($item);
        return $result === null ? $this->missing() : response()->json($result);
    }

    public function store(Request $request): JsonResponse
    {
        $name = $this->name($request);
        if ($name === '') {
            return response()->json(['message' => 'name is required'], 400);
        }
        return response()->json($this->store->create($name), 201);
    }

    public function update(Request $request, int $item): JsonResponse
    {
        $name = $this->name($request);
        if ($name === '') {
            return response()->json(['message' => 'name is required'], 400);
        }
        $result = $this->store->update($item, $name);
        return $result === null ? $this->missing() : response()->json($result);
    }

    public function destroy(int $item): Response
    {
        return $this->store->delete($item) ? new Response(null, 204) : $this->missing();
    }

    private function name(Request $request): string
    {
        $value = $request->json('name');
        return is_string($value) ? trim($value) : '';
    }

    private function missing(): JsonResponse
    {
        return response()->json(['message' => 'Item not found'], 404);
    }
}
