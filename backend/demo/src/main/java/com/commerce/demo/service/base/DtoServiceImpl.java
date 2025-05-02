package com.commerce.demo.service.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public abstract class DtoServiceImpl<T, D, ID> extends CrudServiceImpl<T, ID> implements DtoService<T, D, ID> {

    public DtoServiceImpl(JpaRepository<T, ID> repository) {
        super(repository);
    }

    protected abstract D toDto(T entity);
    protected abstract T toEntity(D dto);
    protected abstract void updateEntityFromDto(D dto, T entity);

    @Override
    @Transactional(readOnly = true)
    public List<D> findAllDtos() {
        return super.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<D> findDtoById(ID id) {
        return super.findById(id).map(this::toDto);
    }

    @Override
    @Transactional
    public D saveFromDto(D dto) {
        T entity = toEntity(dto);
        T savedEntity = super.save(entity);
        return toDto(savedEntity);
    }

    @Override
    @Transactional
    public D updateFromDto(ID id, D dto) {
        T existingEntity = super.findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
        updateEntityFromDto(dto, existingEntity);
        T updatedEntity = super.save(existingEntity);
        return toDto(updatedEntity);
    }
}