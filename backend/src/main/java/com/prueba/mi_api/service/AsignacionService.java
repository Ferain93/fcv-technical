package com.prueba.mi_api.service;

import com.prueba.mi_api.dto.AsignacionRequestDTO;
import com.prueba.mi_api.dto.AsignacionResponseDTO;
import com.prueba.mi_api.model.Medicamento;
import com.prueba.mi_api.model.Paciente;
import com.prueba.mi_api.model.PacienteMedicamento;
import com.prueba.mi_api.repository.PacienteMedicamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class AsignacionService {

    private final PacienteMedicamentoRepository repository;
    private final PacienteService pacienteService;
    private final MedicamentoService medicamentoService;

    public AsignacionService(PacienteMedicamentoRepository repository,
                             PacienteService pacienteService,
                             MedicamentoService medicamentoService) {
        this.repository = repository;
        this.pacienteService = pacienteService;
        this.medicamentoService = medicamentoService;
    }

    public AsignacionResponseDTO asignar(AsignacionRequestDTO dto) {
        Paciente paciente = pacienteService.obtenerEntidadPorId(dto.pacienteId());
        Medicamento medicamento = medicamentoService.obtenerEntidadPorId(dto.medicamentoId());

        PacienteMedicamento asignacion = new PacienteMedicamento();
        asignacion.setPaciente(paciente);
        asignacion.setMedicamento(medicamento);
        asignacion.setDosis(dto.dosis());
        asignacion.setFrecuencia(dto.frecuencia());
        asignacion.setFechaInicio(dto.fechaInicio());

        PacienteMedicamento guardada = repository.save(asignacion);

        return new AsignacionResponseDTO(
                guardada.getId(),
                paciente.getId(),
                paciente.getNombre() + " " + paciente.getApellido(),
                medicamento.getId(),
                medicamento.getNombre(),
                guardada.getDosis(),
                guardada.getFrecuencia(),
                guardada.getFechaInicio()
        );
    }
}
