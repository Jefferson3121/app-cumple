# Quickstart: Validación de la Pantalla de Cuenta Regresiva

## Prerrequisitos

- Node.js LTS y npm disponibles.
- Dependencias instaladas después de crear la aplicación React/Vite.
- Al menos tres fotografías locales ubicadas en `src/assets/photos/`.

## Ejecución

Desde la raíz del proyecto:

```powershell
npm install
npm run dev
```

Abrir la URL local mostrada por Vite en un navegador.

## Escenarios de validación

1. **Vista inicial móvil**: usar una ventana de 320 px de ancho, abrir la pantalla y
   verificar que el fondo ocupa todo el viewport, la capa es visible y aparecen días,
   horas, minutos y segundos sin desplazamiento horizontal.
2. **Actualización**: observar el contador durante 60 segundos y comprobar que cambia
   al menos una vez por segundo.
3. **Rotación**: configurar un intervalo corto solo para la prueba y verificar que la
   fotografía cambia automáticamente sin interacción.
4. **Responsive**: probar anchos de teléfono, tableta y escritorio, y alternar
   orientación vertical/horizontal. La composición debe reajustarse sin recortar el
   contador.
5. **Legibilidad**: probar fotografías claras y oscuras. La capa semitransparente debe
   mantener legibles las cuatro unidades.
6. **Recursos locales**: desconectar el acceso externo y verificar que las fotografías
   configuradas siguen disponibles desde el proyecto.
7. **Límite de alcance**: usar una fecha de prueba próxima a cero y confirmar que no se
   valida ni se asume una experiencia posterior en esta fase.

Los criterios y el contrato detallado se encuentran en [spec.md](./spec.md) y
[contracts/ui.md](./contracts/ui.md).
