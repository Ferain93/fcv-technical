package com.prueba.mi_api.model;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "medicamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El fabricante es obligatorio")
    private String fabricante;

    @NotNull(message = "La fecha de caducidad es obligatoria")
    @Column(name = "fecha_caducidad")
    private LocalDate fechaCaducidad;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    @NotBlank(message = "Las indicaciones son obligatorias")
    @Column(columnDefinition = "TEXT")
    private String indicaciones;
}
