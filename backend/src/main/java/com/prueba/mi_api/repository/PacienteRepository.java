package com.prueba.mi_api.repository;

import com.prueba.mi_api.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByDiagnosticoPrincipalContainingIgnoreCase(String diagnostico);
}
