export default class Project {
  constructor() {
    this.gallery = {
      items: document.querySelectorAll('.image'),
      container: document.querySelector('#galleryContainer'),
    };

    if (this.gallery.container) {
      this.item = {
        width: (this.gallery.items[0].offsetWidth / 3),
        height: this.gallery.items[0].offsetHeight,
      };
      this.grid = document.querySelector('#fillGrid');
    }
  }

  init() {
    if (this.gallery.container) {
      this.generatePositions();
      this.generateGrid();

      this.gallery.items.forEach((item) => {
        item.classList.add('image--open');
        item.classList.remove('image--closed');
      });

      window.addEventListener('resize', () => {
        this.generatePositions();
        this.generateGrid(true);
      }, false);
    }
  }

  generatePositions() {
    this.gallery.items.forEach((item) => {
      const ROWPOS = item.getAttribute('data-row');

      item.setAttribute('style', `grid-row:${ROWPOS};`);
    });
  }

  generateGrid(regenerate = false) {
    while (this.grid.firstChild) {
      this.grid.removeChild(this.grid.firstChild);
    }

    if (regenerate) {
      this.gallery = {
        items: document.querySelectorAll('.image'),
        container: document.querySelector('#galleryContainer'),
      };
      this.item = {
        width: (this.gallery.items[0].offsetWidth / 3),
        height: this.gallery.items[0].offsetHeight,
      };
    }

    // const GRIDWIDTH = (this.gallery.container.offsetWidth / this.item.width);
    let gridWidth = 10;
    if (window.innerWidth < 640) {
      gridWidth = 5;
    }

    let totalRows = 4;
    if (window.innerWidth < 640) {
      totalRows = 6;
    }

    const GRIDHEIGHT = Number((
      (this.gallery.container.offsetHeight / this.item.height)
      * totalRows
    ).toFixed());

    this.times(gridWidth * GRIDHEIGHT)(() => {
      const GRIDITEM = document.createElement('span');
      GRIDITEM.className = 'grid__item';
      this.grid.appendChild(GRIDITEM);
    });
  }

  times(total) {
    return (current) => {
      if (total > 0) {
        current();
        this.times(total - 1)(current);
      }
    };
  }
}
