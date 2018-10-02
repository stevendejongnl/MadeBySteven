# Portfolio

## Preview link
[madebysteven.nl][1]

## Install project
Use `npm install` to install packages.

Run `gulp build` to compile styles and scripts.

## Sass architecture

```
styles/
├── abstracts/ 
│   ├── _variables.scss     # Sass Variables
│   ├── _functions.scss     # Sass Functions
│   ├── _mixins.scss        # Sass Mixins
│   └── _placeholders.scss  # Sass Placeholders
│
├── base/
│   ├── _reset.scss         # Reset/normalize
│   └── _typography.scss    # Typography rules
│
├── components/
│   ├── _buttons.scss       # Buttons
│   ├── _project.scss       # Project
│   └── _visibility.scss    # Visibility
│
├── layout/
│   ├── _grid.scss          # Grid system
│   ├── _header.scss        # Header
│   └── _main.scss          # Main
│
├── pages/
│   ├── _home.scss          # Home
│   ├── _about.scss         # About
│   ├── _project.scss       # Project
│   └── _404.scss           # 404
│
└── main.scss               # Main Sass file
```

[1]:	https://madebysteven.nl