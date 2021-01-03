---
title: "PAC5. Implementar una PWA"
author: 'Josep V. Monjo'
date: '04/01/2021'
lang: ca
numbersections: true
fontfamily: FiraSans
linkcolor: blue
urlcolor: blue
header-includes: |
    \usepackage{fancyhdr}
    \pagestyle{fancy}
    \fancyhf{}
    \rhead{PAC5}
    \lhead{Josep V. Monjo}
    \cfoot{\thepage}
---

# Selecció de la API

He triat la api de unsplash. M'he generat una api key i l'he adjuntat al les cridades al servidor des del client. No és allò ideal ja que la clau queda exposada. La clau deuria d'estar a un servidor (per exemple amb node) i fer les cridades mitjançant aquell servidor intermediari.

He implementat una barra de cerca que es refresca al teclejar una nova paraula.

# PWA

He afegit les capacitats de pwa amb `ng add @angular/pwa`.

Al fitxer de configuració generat `ngsw-config.json` he afegit la url de bootstrap per al cache de la shell i la de la api per a la cache de les dades.

```json
// (...)
"urls": [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        ],
// (...)
{
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
```
