# dam2-productos

Aplicación Ionic + Angular Standalone que consume https://dummyjson.com/products.

## Arrancar en local
```
npm install
npm start
```
Se abre en http://localhost:8100

## Rutas
- /inicio
- /productos

## Git / GitHub (rama desarrollo)
```
git init
git add .
git commit -m "Creación inicial de aplicación Ionic Standalone"
git checkout -b desarrollo
git remote add origin https://github.com/TU_USUARIO/dam2-productos.git
git push -u origin desarrollo
```

## Vercel
Importar el repositorio y usar `desarrollo` como rama de producción.
`vercel.json` ya incluye el rewrite para que /productos funcione al recargar.
