# Data Model: Pantalla de Cuenta Regresiva

## Fecha objetivo

Representa el instante contra el que se calcula el contador.

**Campos**

- `date`: fecha y hora objetivo.
- `timezone`: contexto horario definido para interpretar la fecha.

**Reglas**

- Debe ser una fecha válida.
- La presentación no debe mostrar valores negativos.
- Cuando llegue a cero, la pantalla no define una experiencia posterior.

## Unidad de cuenta regresiva

Valor derivado que se presenta al visitante.

**Campos**

- `days`: días restantes.
- `hours`: horas restantes dentro del día.
- `minutes`: minutos restantes dentro de la hora.
- `seconds`: segundos restantes dentro del minuto.

**Reglas**

- `hours`, `minutes` y `seconds` deben estar entre 0 y 59.
- `days` debe ser 0 o mayor.
- El valor se recalcula al menos una vez por segundo.

## Fotografía de fondo

Recurso local disponible para la rotación visual.

**Campos**

- `source`: referencia local al archivo de imagen.
- `alt`: descripción accesible del recurso cuando corresponda.
- `position`: orden de la fotografía dentro de la colección.

**Reglas**

- La colección puede contener una o más fotografías.
- La fotografía activa debe cubrir el viewport sin deformarse.
- Si un recurso no está disponible, debe existir un fondo alternativo.

## Estado de pantalla

Estado visual de la primera pantalla.

**Estados**

- `countdown-active`: la fecha objetivo aún no ha llegado.
- `countdown-complete`: la fecha objetivo llegó a cero; el siguiente flujo queda fuera de alcance.

**Transiciones**

`countdown-active` → `countdown-complete` cuando el tiempo restante es cero.
