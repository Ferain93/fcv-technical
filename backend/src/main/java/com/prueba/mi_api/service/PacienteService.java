package com.prueba.mi_api.service;

import com.prueba.mi_api.dto.PacienteRequestDTO;
import com.prueba.mi_api.dto.PacienteResponseDTO;
import com.prueba.mi_api.exception.ResourceNotFoundException;
import com.prueba.mi_api.model.Paciente;
import com.prueba.mi_api.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository repository;

    public PacienteService(PacienteRepository repository) {
        this.repository = repository;
    }

    public PacienteResponseDTO crear(PacienteRequestDTO dto) {
        Paciente paciente = new Paciente();
        paciente.setNombre(dto.nombre());
        paciente.setApellido(dto.apellido());
        paciente.setFechaNacimiento(dto.fechaNacimiento());
        paciente.setGenero(dto.genero());
        paciente.setDiagnosticoPrincipal(dto.diagnosticoPrincipal());
        paciente.setAlergias(dto.alergias());

        Paciente guardado = repository.save(paciente);
        return toResponseDTO(guardado);
    }

    public List<PacienteResponseDTO> obtenerTodos() {
        return repository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public PacienteResponseDTO obtenerPorId(Long id) {
        Paciente paciente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con ID: " + id));
        return toResponseDTO(paciente);
    }

    public List<PacienteResponseDTO> buscarPorDiagnostico(String diagnostico) {
        return repository.findByDiagnosticoPrincipalContainingIgnoreCase(diagnostico).stream()
                .map(this::toResponseDTO)
                .toList();
    }

    // Método interno para obtener la entidad (usado por AsignacionService)
    public Paciente obtenerEntidadPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado con ID: " + id));
    }

    private PacienteResponseDTO toResponseDTO(Paciente p) {
        return new PacienteResponseDTO(
                p.getId(),
                p.getNombre(),
                p.getApellido(),
                p.getFechaNacimiento(),
                p.getGenero(),
                p.getDiagnosticoPrincipal(),
                p.getAlergias()
        );
    }
}
