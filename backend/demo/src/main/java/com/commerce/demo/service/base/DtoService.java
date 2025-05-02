package com.commerce.demo.service.base;

import java.util.List;
import java.util.Optional;

public interface DtoService<T, D, ID> extends CrudService<T, ID> {
    List<D> findAllDtos();
    Optional<D> findDtoById(ID id);
    D saveFromDto(D dto);
    D updateFromDto(ID id, D dto);
}