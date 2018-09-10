export default class Project {
  constructor() {
    this.gallery = {
      items: document.querySelectorAll('.image'),
      container: document.querySelector('#galleryContainer'),
    };
    this.item = {
      width: (this.gallery.items[0].offsetWidth / 3),
      height: this.gallery.items[0].offsetHeight,
    };
    this.grid = document.querySelector('#fillGrid');
  }

  init() {
    this.generatePositions();
    this.generateGrid();

    // this.gallery.container.addEventListener('click', (event) => {
    //   if (event.target.className !== 'image__plus') {
    //     event.preventDefault();
    //     this.gallery.items.forEach((item) => {
    //       item.classList.remove('image--open');
    //       item.classList.add('image--closed');
    //     });
    //   }
    // });

    this.gallery.items.forEach((item) => {
      item.classList.add('image--open');
      item.classList.remove('image--closed');

      // item.childNodes[1].addEventListener('click', (event) => {
      //   event.preventDefault();
      //
      //   if (event.target.className === 'image__plus') {
      //     item.classList.toggle('image--closed');
      //     item.classList.toggle('image--open');
      //   }
      // });
      // item.childNodes[3].addEventListener('click', (event) => {
      //   event.preventDefault();
      //
      //   event.path.forEach((element) => {
      //     if (element.className === 'image__container') {
      //       window.location = element.getAttribute('href');
      //     }
      //   });
      // });
      // if (window.innerWidth >= 640) {
      //   item.childNodes[1].addEventListener('mouseenter', (event) => {
      //     event.preventDefault();
      //
      //     item.classList.remove('image--closed');
      //     item.classList.add('image--open');
      //   });
      //   item.childNodes[3].addEventListener('mouseleave', (event) => {
      //     event.preventDefault();
      //
      //     item.classList.add('image--closed');
      //     item.classList.remove('image--open');
      //   });
      // }
    });

    window.addEventListener('resize', () => {
      this.generatePositions();
      this.generateGrid(true);
    }, false);
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
