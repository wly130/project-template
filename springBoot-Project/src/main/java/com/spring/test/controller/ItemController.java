package com.spring.test.controller;

import java.util.List;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    public record Item(int id, String name) {}
    public record ItemInput(String name) {}

    private final ConcurrentSkipListMap<Integer, Item> items = new ConcurrentSkipListMap<>();
    private final AtomicInteger nextId = new AtomicInteger(1);

    @GetMapping
    public List<Item> list() {
        return List.copyOf(items.values());
    }

    @GetMapping("/{id}")
    public Item get(@PathVariable int id) {
        Item item = items.get(id);
        if (item == null) {
            throw notFound();
        }
        return item;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Item create(@RequestBody ItemInput input) {
        Item item = new Item(nextId.getAndIncrement(), nameOf(input));
        items.put(item.id(), item);
        return item;
    }

    @PutMapping("/{id}")
    public Item update(@PathVariable int id, @RequestBody ItemInput input) {
        Item item = new Item(id, nameOf(input));
        if (items.replace(id, item) == null) {
            throw notFound();
        }
        return item;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable int id) {
        if (items.remove(id) == null) {
            throw notFound();
        }
    }

    private static String nameOf(ItemInput input) {
        if (input.name() == null || input.name().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name is required");
        }
        return input.name().strip();
    }

    private static ResponseStatusException notFound() {
        return new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
    }
}
