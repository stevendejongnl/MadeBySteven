export default class Home {
  constructor() {
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

    window.addEventListener('resize', () => {
      this.generatePositions();
      this.generateGrid(true);
    }, false);
  }

  generatePositions() {
    this.projects.items.forEach((project) => {
      const ROWPOS = project.getAttribute('data-row');
      project.setAttribute('style', `grid-row:${ROWPOS}`);
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

    const GRIDWIDTH = (this.projects.container.offsetWidth / this.project.width);
    const GRIDHEIGHT = (
      (this.projects.container.offsetHeight / this.project.height)
      + 1
    );

    this.times(GRIDWIDTH * GRIDHEIGHT)(() => {
      const GRIDITEM = document.createElement('span');
      GRIDITEM.className = 'grid__item';
      this.grid.appendChild(GRIDITEM);
    });
  }

  times(x) {
    return (f) => {
      if (x > 0) {
        f();
        this.times(x - 1)(f);
      }
    };
  }
}
