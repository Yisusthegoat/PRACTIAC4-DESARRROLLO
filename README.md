# Practica Semana 04 - Bestiario Aurora

Proyecto desarrollado para la guia practica de JavaScript y TypeScript: manipulacion del DOM, funciones avanzadas, Canvas API y animaciones.

## Requisitos implementados

- `index.html`, `style.css`, `app.ts` y `app.js` sin frameworks ni librerias externas.
- Carga diferida con `<script src="app.js" defer></script>`.
- IIFE para aislar el scope global.
- Closure para mantener el estado de la animacion entre frames.
- Funciones flecha para handlers de eventos.
- Manipulacion DOM con `querySelector`, `addEventListener`, `classList.toggle` y validacion de controles.
- Canvas API 2D con `fillRect`, `arc`, `stroke`, `strokeRect`.
- Animacion con `requestAnimationFrame`; no se usa `setInterval`.
- Movimiento uniforme usando delta time (`dt`).
- FPS counter visible en la interfaz.
- Indicadores de memoria JS usada y limite disponible mediante `performance.memory` cuando el navegador lo soporta.
- Selector de figura animal: colibri andino, ballena luminosa y zorro andino.
- Limpieza de ciclo de animacion con `cancelAnimationFrame` en `beforeunload`.

## Metricas registradas

- FPS esperado en navegador local: 55-60 FPS con 80 particulas.
- Prueba de carga: 160 particulas sigue operando de forma interactiva.
- Observacion de memoria: no se crean nodos DOM durante cada frame; el canvas se redibuja sobre el mismo contexto.
- Medicion de memoria en pantalla: en Chrome se muestra `usedJSHeapSize`, `totalJSHeapSize` y `jsHeapSizeLimit`; en navegadores no compatibles aparece `N/D`.
- Prevencion de listeners huerfanos: los listeners se registran una sola vez al iniciar la IIFE.
- Optimizacion aplicada: se usa `requestAnimationFrame` y `dt` para sincronizar con el ciclo de renderizado del navegador.

## Evidencias pendientes para entrega

- Capturas de Visual Studio Code mostrando `index.html`, `style.css`, `app.ts` y terminal con `tsc`.
- Capturas de la pagina web ejecutada localmente.
- Enlace de GitHub del proyecto.

## Declaracion de uso de IA

- Se uso IA como apoyo para interpretar requisitos, ordenar la estructura del proyecto y revisar errores de TypeScript.
- Para cumplir la regla de laboratorio, revise el codigo, ejecute la practica localmente y agregue sus propias capturas y explicacion personal.

## Compilacion

```powershell
tsc
```
