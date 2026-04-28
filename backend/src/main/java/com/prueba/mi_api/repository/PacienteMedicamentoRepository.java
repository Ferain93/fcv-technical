package com.prueba.mi_api.repository;

import com.prueba.mi_api.model.PacienteMedicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PacienteMedicamentoRepository extends JpaRepository<PacienteMedicamento, Long> {

    List<PacienteMedicamento> findByPacienteId(Long pacienteId);
}
