# UI Contract: Pantalla de Cuenta Regresiva

## Entrada de la pantalla

La pantalla recibe o configura:

- Una fecha objetivo válida.
- Una colección ordenada de fotografías locales.
- Un intervalo de rotación de fotografías.

## Salida visible

Mientras la fecha no haya llegado, la interfaz debe exponer:

- Un fondo fotográfico que cubra todo el viewport.
- Una capa semitransparente por encima del fondo.
- Un contador legible con cuatro unidades: días, horas, minutos y segundos.

## Reglas responsive

- El diseño base se define para teléfonos móviles.
- El contenido debe caber en una sola vista móvil sin desplazamiento horizontal.
- La composición debe reajustarse al cambiar orientación o tamaño del viewport.
- Tabletas y escritorios deben conservar la misma jerarquía visual y funcional.

## Límite de contrato

Este contrato no define textos finales ni una salida visual posterior a `countdown-complete`.
