<?php

namespace App\Repositories\Items;

use PDO;

final class ItemStore
{
    private PDO $database;

    public function __construct()
    {
        $path = storage_path('items_' . app()->environment() . '.sqlite');
        $directory = dirname($path);
        if (!is_dir($directory) && !@mkdir($directory, 0777, true) && !is_dir($directory)) {
            throw new \RuntimeException('Cannot create the SQLite directory');
        }
        $this->database = new PDO('sqlite:' . $path);
        $this->database->exec('PRAGMA busy_timeout = 5000');
        $this->database->exec(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)'
        );
    }

    public function list(): array
    {
        return $this->database->query('SELECT id, name FROM items ORDER BY id')->fetchAll(PDO::FETCH_ASSOC);
    }

    public function get(int $id): ?array
    {
        $query = $this->database->prepare('SELECT id, name FROM items WHERE id = ?');
        $query->execute([$id]);
        return $query->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function create(string $name): array
    {
        $query = $this->database->prepare('INSERT INTO items (name) VALUES (?)');
        $query->execute([$name]);
        return ['id' => (int) $this->database->lastInsertId(), 'name' => $name];
    }

    public function update(int $id, string $name): ?array
    {
        $query = $this->database->prepare('UPDATE items SET name = ? WHERE id = ? RETURNING id, name');
        $query->execute([$name, $id]);
        return $query->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function delete(int $id): bool
    {
        $query = $this->database->prepare('DELETE FROM items WHERE id = ?');
        $query->execute([$id]);
        return $query->rowCount() > 0;
    }
}
