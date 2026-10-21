# App de cumple

Aplicación React/Vite mobile-first para la pantalla inicial de cuenta regresiva.

## Desarrollo

```powershell
npm install
npm run dev
```

Las fotografías de la pantalla se mantienen como recursos locales en
`src/assets/photos/`. El HTML anterior fue reemplazado por la aplicación React para
evitar mantener dos implementaciones.

Los audios locales están centralizados en `src/data/audioConfig.js` y sus archivos
viven en `src/assets/audio/`. Para reemplazarlos, conserva la asignación entre cada
unidad y su import correspondiente.

El audio independiente del balón se configura en `src/data/ballAudioConfig.js` y usa
`src/assets/audio/ball-audio.wav`.
