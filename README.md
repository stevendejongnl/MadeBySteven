# Random User Book
A address book build on the randomuser.io api.

## Preview link
[random-user-book.netlify.com](https://random-user-book.netlify.com/)

## Example of Dribbble used
[Address book for mobile Design language exploration by Gleb Kuznetsov](https://dribbble.com/shots/3213453-Address-book-for-mobile-Design-language-exploration)

## Install project
Use `npm install` to install packages.

Run `grunt` to compile styles and scripts.

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
│   └── _contacts.scss      # Activities
│
├── layout/
│   ├── _grid.scss          # Grid system
│   ├── _header.scss        # Header
│   └── _main.scss          # Main
│
├── pages/
│   ├── address-book.scss   # Dashboard specific styles
│   └── ...                 # Etc.
│
└── main.scss               # Main Sass file
```

