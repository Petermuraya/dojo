dojo

## Performance / Image Optimization

- Build with Vite to trigger `vite-imagetools` optimizations: `npm run build`.
- Install new dev deps after pulling changes: `npm install`.
- Convert large JPEG/PNG assets to WebP for smaller bundles. Example using `cwebp`:

```bash
cwebp -q 80 src/assets/large-photo.jpg -o src/assets/large-photo.webp
```

- For best results: ensure critical hero images are kept in WebP and imported with `priority` in `OptimizedImage`.

If you want, I can run `npm install` and `npm run build` now and fix any build errors.
