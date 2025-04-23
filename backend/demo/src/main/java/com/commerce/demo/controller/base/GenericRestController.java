package com.commerce.demo.controller.base;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.commerce.demo.service.base.CrudService;

import java.util.List;

public abstract class GenericRestController<T, ID> {

    protected final CrudService<T, ID> service;

    public GenericRestController(CrudService<T, ID> service) {
        this.service = service;
    }

    @GetMapping
    public List<T> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> get(@PathVariable ID id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public T create(@RequestBody T entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T entity) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
