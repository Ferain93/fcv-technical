package com.prueba.mi_api.service;

import com.prueba.mi_api.dto.MedicamentoRequestDTO;
import com.prueba.mi_api.dto.MedicamentoResponseDTO;
import com.prueba.mi_api.exception.ResourceNotFoundException;
import com.prueba.mi_api.model.Medicamento;
import com.prueba.mi_api.repository.MedicamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentoService {

    private final MedicamentoRepository repository;

    public MedicamentoService(MedicamentoRepository repository) {
        this.repository = repository;
    }

    public MedicamentoResponseDTO crear(MedicamentoRequestDTO dto) {
        Medicamento medicamento = new Medicamento();
        medicamento.setNombre(dto.nombre());
        medicamento.setFabricante(dto.fabricante());
        medicamento.setFechaCaducidad(dto.fechaCaducidad());
        medicamento.setStock(dto.stock());
        medicamento.setIndicaciones(dto.indicaciones());

        Medicamento guardado = repository.save(medicamento);
        return toResponseDTO(guardado);
    }

    public List<MedicamentoResponseDTO> obtenerTodos() {
        return repository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public MedicamentoResponseDTO obtenerPorId(Long id) {
        Medicamento medicamento = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicamento no encontrado con ID: " + id));
        return toResponseDTO(medicamento);
    }

    // Método interno para obtener la entidad (usado por AsignacionService)
    public Medicamento obtenerEntidadPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicamento no encontrado con ID: " + id));
    }

    private MedicamentoResponseDTO toResponseDTO(Medicamento m) {
        return new MedicamentoResponseDTO(
                m.getId(),
                m.getNombre(),
                m.getFabricante(),
                m.getFechaCaducidad(),
                m.getStock(),
                m.getIndicaciones()
        );
    }
}
