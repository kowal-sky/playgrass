# PlayGrass (PWA)

App web instalable para gamers universitarios: alarmas que limitan el tiempo de videojuegos según tu carga académica, con interfaz de videojuego (misiones, XP, monedas, racha, tienda de temas y calendario de evaluaciones).

Todo el código está en `index.html`. No necesita compilar nada ni instalar dependencias. Los datos se guardan en el almacenamiento local del dispositivo.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `playgrass`) y sube estos archivos a la raíz:

   ```bash
   git init
   git add .
   git commit -m "PlayGrass PWA"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/playgrass.git
   git push -u origin main
   ```

2. En el repositorio: **Settings > Pages > Build and deployment**. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
3. Espera 1 o 2 minutos. La app queda en `https://TU-USUARIO.github.io/playgrass/`.

## Instalar en el celular Android

1. Abre ese link en Chrome.
2. Menú ⋮ > **Instalar app** (o **Agregar a pantalla de inicio**).
3. Queda con ícono propio, a pantalla completa y funciona sin conexión después de la primera visita.

## Actualizar la app

Edita `index.html`, haz push (`git add . && git commit -m "cambios" && git push`) y espera 1 o 2 minutos. Si cambias archivos y el celular sigue mostrando la versión vieja, sube el número en `sw.js` (`const CACHE = 'playgrass-v3'`) y cierra y vuelve a abrir la app.

## Probar en el navegador

Abre `index.html` o corre `npx serve .`. En pantallas anchas se ve un marco de teléfono con un panel de herramientas (reloj acelerado, terminar día, monedas). En el celular ese panel está oculto; agrega `?dev` a la dirección para verlo. Fuera de ese modo el reloj corre en tiempo real.

## Notificaciones

En la PWA solo funciona el aviso "Se acabó el tiempo" (con vibración y botones +15 min y Apagar), y únicamente mientras la app siga abierta o en segundo plano. La motivación de la mañana y el resumen del fin de semana necesitan la versión APK (carpeta `playgrass-repo`), porque los navegadores no permiten programar notificaciones con la app cerrada. Se activan en Perfil > Notificaciones.

## Limitaciones conocidas

- En la PWA las alarmas dependen de que el navegador mantenga la app viva; el APK es más confiable.
- El día se cierra con un botón (en la preview "Terminar día"). Falta el cierre automático a medianoche.
- Las fuentes (Rajdhani, Teko, Audiowide, Press Start 2P) vienen de Google Fonts; sin conexión en la primera visita se usa una fuente de respaldo.
