export default class Home {
  constructor() {
    this.pageContainer = document.querySelector('.page-home');
    this.projects = {
      items: document.querySelectorAll('.home-project'),
      container: document.querySelector('#projectsContainer'),
    };
    this.project = {
      width: (this.projects.items[0].offsetWidth / 3),
      height: this.projects.items[0].offsetHeight,
    };
    this.grid = document.querySelector('#fillGrid');
  }

  init() {
    this.generatePositions();
    this.generateGrid();

    this.projects.container.addEventListener(Home.clickEvent(), (event) => {
      if (event.target.className !== 'home-project__plus') {
        event.preventDefault();
        this.projects.items.forEach((project) => {
          project.classList.remove('home-project--open');
          project.classList.add('home-project--closed');
        });
      }
    });

    this.projects.items.forEach((project) => {
      project.classList.remove('home-project--open');
      project.classList.add('home-project--closed');

      project.childNodes[1].addEventListener(Home.clickEvent(), (event) => {
        event.preventDefault();

        if (event.target.className === 'home-project__plus') {
          project.classList.toggle('home-project--closed');
          project.classList.toggle('home-project--open');
        }
      });
      project.childNodes[3].addEventListener(Home.clickEvent(), (event) => {
        event.preventDefault();

        if (event.path === undefined) {
          if (event.target.className === 'home-project__figure-inner' || event.target.className === 'home-project__figcaption') {
            window.location = event.target.parentNode.parentNode.getAttribute('href');
          }
          if (event.target.className === 'home-project__image' || event.target.className === 'home-project__view') {
            window.location = event.target.parentNode.parentNode.parentNode.getAttribute('href');
          }
        } else {
          event.path.forEach((element) => {
            if (element.className === 'home-project__container') {
              window.location = element.getAttribute('href');
            }
          });
        }
      });
      if (window.innerWidth >= 640) {
        project.classList.remove('home-project--open');
        project.classList.add('home-project--closed');

        project.childNodes[1].addEventListener('mouseenter', (event) => {
          event.preventDefault();

          project.classList.remove('home-project--closed');
          project.classList.add('home-project--open');
        });
        project.childNodes[3].addEventListener('mouseleave', (event) => {
          event.preventDefault();

          project.classList.add('home-project--closed');
          project.classList.remove('home-project--open');
        });
      }
    });

    window.addEventListener('resize', () => {
      this.generatePositions();
      this.generateGrid(true);
    }, false);
  }

  generatePositions() {
    this.projects.items.forEach((project) => {
      let rowPos = project.getAttribute('data-row');
      rowPos = rowPos.split(',');

      if (window.innerWidth < 640) {
        project.setAttribute('style', `grid-row:${rowPos[0]};`);
      } else {
        project.setAttribute('style', `grid-row:${rowPos[1]}`);
      }
    });
  }

  generateGrid(regenerate = false) {
    while (this.grid.firstChild) {
      this.grid.removeChild(this.grid.firstChild);
    }

    if (regenerate) {
      this.projects = {
        items: document.querySelectorAll('.home-project'),
        container: document.querySelector('#projectsContainer'),
      };
      this.project = {
        width: (this.projects.items[0].offsetWidth / 3),
        height: this.projects.items[0].offsetHeight,
      };
    }

    // const GRIDWIDTH = (this.projects.container.offsetWidth / this.project.width);
    let gridWidth = 10;
    if (window.innerWidth < 640) {
      gridWidth = 5;
    }

    const BLOCKS = {
      page: Math.ceil((this.pageContainer.offsetHeight / this.project.height)),
      needed: Math.ceil((this.projects.container.offsetHeight / this.project.height) + 2),
    };

    const GRID_HEIGHT = (BLOCKS.needed > BLOCKS.page ? BLOCKS.needed : BLOCKS.page);

    this.times(gridWidth * GRID_HEIGHT)(() => {
      const GRID_ITEM = document.createElement('span');
      GRID_ITEM.className = 'grid__item';
      this.grid.appendChild(GRID_ITEM);
    });
  }

  static clickEvent() {
    let clickEvent = 'click';
    if ('ontouchstart' in document.documentElement === true) {
      clickEvent = 'touchstart';
    }

    return clickEvent;
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
