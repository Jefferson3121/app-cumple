# Research: Pantalla de Cuenta Regresiva

## Decision: React con Vite como base de la aplicación

**Rationale**: El proyecto requiere una única pantalla interactiva con estado de
contador y rotación de fotografías. React permite separar esas responsabilidades en
componentes, mientras que Vite ofrece una base ligera de desarrollo y compilación para
un frontend pequeño.

**Alternatives considered**: Mantener el HTML con JavaScript directo habría requerido
menos migración, pero dificultaría la organización solicitada y la evolución de la
experiencia. Un framework más amplio no aporta valor para una sola pantalla.

## Decision: Tailwind CSS para el sistema visual responsive

**Rationale**: Tailwind permite expresar un enfoque mobile-first de forma consistente,
con breakpoints, tamaños fluidos y utilidades de viewport sin añadir una biblioteca de
componentes visuales.

**Alternatives considered**: CSS tradicional es viable, pero dispersa las decisiones
responsive entre reglas manuales. Bibliotecas UI completas se descartan por añadir
dependencias innecesarias.

## Decision: Fotografías locales importadas por la aplicación

**Rationale**: Los recursos locales evitan depender de servidores externos, permiten
controlar disponibilidad y preservan la experiencia cuando no existe conectividad
externa.

**Alternatives considered**: URLs remotas y servicios de imágenes se descartan por
dependencia de red y por no cumplir el requisito de recursos locales.

## Decision: Implementar el contador y la rotación como lógica aislada y cancelable

**Rationale**: El contador necesita actualizarse una vez por segundo y la rotación
necesita su propio intervalo. Separar ambos ciclos evita acoplamiento y permite limpiar
los temporizadores cuando la pantalla se desmonta.

**Alternatives considered**: Un único intervalo para toda la pantalla simplificaría el
código inicial, pero mezclaría responsabilidades y complicaría ajustar los intervalos.

## Decision: No añadir librerías adicionales en esta fase

**Rationale**: React, Vite y Tailwind cubren el alcance actual. La experiencia no
requiere animación avanzada, gestión de estado global, backend ni persistencia.

**Alternatives considered**: Librerías de animación, carruseles o fechas se reservan
para una necesidad concreta que no esté cubierta por la plataforma o por la lógica
simple de la pantalla.
