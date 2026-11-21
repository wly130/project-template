<?php

namespace App\Controller\Items;

use App\Repository\Items\ItemStore;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/items', requirements: ['id' => '\\d+'])]
final class ItemController
{
    public function __construct(private ItemStore $store)
    {
    }

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse($this->store->list());
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $result = $this->store->get($id);
        return $result === null ? $this->missing() : new JsonResponse($result);
    }

    #[Route('', methods: ['POST'])]
    public function store(Request $request): JsonResponse
    {
        $name = $this->name($request);
        if ($name === '') {
            return new JsonResponse(['message' => 'name is required'], 400);
        }
        return new JsonResponse($this->store->create($name), 201);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id): JsonResponse
    {
        $name = $this->name($request);
        if ($name === '') {
            return new JsonResponse(['message' => 'name is required'], 400);
        }
        $result = $this->store->update($id, $name);
        return $result === null ? $this->missing() : new JsonResponse($result);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function destroy(int $id): Response
    {
        return $this->store->delete($id) ? new Response(null, 204) : $this->missing();
    }

    private function name(Request $request): string
    {
        $value = ($request->getPayload()->all()['name'] ?? null);
        return is_string($value) ? trim($value) : '';
    }

    private function missing(): JsonResponse
    {
        return new JsonResponse(['message' => 'Item not found'], 404);
    }
}
