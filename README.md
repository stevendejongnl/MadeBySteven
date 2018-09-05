# Portfolio

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
│   └── _buttons.scss       # Buttons
│   └── _project.scss       # Project
│
├── layout/
│   ├── _grid.scss          # Grid system
│   ├── _header.scss        # Header
│   └── _main.scss          # Main
│
├── pages/
│   ├── home.scss           # Home
│   └── ...                 # Etc.
│
└── main.scss               # Main Sass file
```

