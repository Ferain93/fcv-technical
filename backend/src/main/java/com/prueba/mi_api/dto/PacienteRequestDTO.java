package com.prueba.mi_api.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public record PacienteRequestDTO(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre,

    @NotBlank(message = "El apellido es obligatorio")
    String apellido,

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser anterior a la fecha actual")
    LocalDate fechaNacimiento,

    @NotBlank(message = "El género es obligatorio")
    String genero,

    String diagnosticoPrincipal,

    List<String> alergias
) {}
