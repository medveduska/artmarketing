# assets/images

This folder holds all real production images for PMLAB.

## Directory structure

```
assets/images/
├── hero-bg.jpg            ← Full-width hero background (min 1920×1080)
├── about-arthur.jpg       ← Arthur's portrait (min 700×880, portrait ratio)
├── og-cover.jpg           ← Open Graph social share image (1200×630)
├── gallery/
│   ├── photo-01.jpg       ← Valletta Terrace Kitchen
│   ├── photo-02.jpg       ← Azure Club, St Julian's
│   ├── photo-03.jpg       ← The Harbour Bar
│   ├── photo-04.jpg       ← Gumbal Summer Edition
│   ├── photo-05.jpg       ← La Rustica, Mdina
│   ├── photo-06.jpg       ← Cisk Experience
│   ├── video-thumb-01.jpg ← Gumbal 2025 video thumbnail
│   ├── video-thumb-02.jpg ← Trabuxu Bistro video thumbnail
│   ├── video-thumb-03.jpg ← Eden Arena video thumbnail
│   ├── web-01.jpg         ← La Spezia website screenshot
│   ├── web-02.jpg         ← MaltaJazz Festival screenshot
│   └── web-03.jpg         ← Level 22 Club screenshot
└── blog/
    ├── blog-nightclub.jpg
    ├── blog-restaurant.jpg
    ├── blog-gumbal.jpg
    ├── blog-webdesign.jpg
    ├── blog-checklist.jpg
    └── blog-brand.jpg
```

## Instructions for replacing placeholder images

All `src` attributes in index.html, blog.html and blog-post.html currently use
`https://picsum.photos/seed/{name}/{width}/{height}` as placeholder URLs.

To replace with real images:
1. Place optimised JPEGs in the paths above.
2. In all HTML files, replace `https://picsum.photos/seed/{name}/{width}/{height}`
   with the local path, e.g. `assets/images/gallery/photo-01.jpg`.

## Recommended image formats & sizes

| Use            | Format | Max dimension | Notes               |
|----------------|--------|---------------|---------------------|
| Hero bg        | JPEG   | 1920px wide   | 70–80% quality      |
| Gallery photos | JPEG   | 1200px wide   | 80% quality         |
| Thumbnails     | JPEG   | 800px wide    | 75% quality         |
| About portrait | JPEG   | 700px wide    | 80% quality         |
| OG cover       | JPEG   | 1200×630px    | Exact size required |

## Video IDs

In index.html, replace the following placeholder `data-video-id` attributes
with real YouTube video IDs on the gallery video items:

- `REPLACE_VIDEO_ID_1` → Gumbal 2025 Official Aftermovie
- `REPLACE_VIDEO_ID_2` → Trabuxu Bistro Brand Film  
- `REPLACE_VIDEO_ID_3` → Eden Arena Season Opener
