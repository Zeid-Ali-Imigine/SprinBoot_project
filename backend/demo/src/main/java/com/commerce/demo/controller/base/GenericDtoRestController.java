package com.commerce.demo.controller.base;

import com.commerce.demo.service.base.DtoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class GenericDtoRestController<T, D, ID> {

    protected final DtoService<T, D, ID> service;

    public GenericDtoRestController(DtoService<T, D, ID> service) {
        this.service = service;
    }

    @GetMapping
    public List<D> listDtos() {
        return service.findAllDtos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<D> getDto(@PathVariable ID id) {
        return service.findDtoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public D createFromDto(@RequestBody D dto) {
        return service.saveFromDto(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<D> updateFromDto(@PathVariable ID id, @RequestBody D dto) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.updateFromDto(id, dto));
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