package com.prueba.mi_api.repository;

import com.prueba.mi_api.model.PacienteMedicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteMedicamentoRepository extends JpaRepository<PacienteMedicamento, Long> {
}
