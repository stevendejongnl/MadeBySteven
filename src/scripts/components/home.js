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

    this.projects.items.forEach((project) => {
      project.classList.remove('home-project__container--open');
      project.classList.add('home-project__container--closed');

      project.addEventListener('click', (event) => {
        if (window.innerWidth < 640) {
          event.preventDefault();

          const CLICKED = event.target.getAttribute('class');
          const LOCATION = project.children[0].getAttribute('href');

          if (CLICKED !== 'home-project__container') {
            document.location = LOCATION;
            return;
          }

          project.classList.toggle('home-project__container--closed');
          project.classList.toggle('home-project__container--open');
        }
      });
    });

    window.addEventListener('resize', () => {
      this.generatePositions();
      this.generateGrid(true);
    }, false);
  }

  generatePositions() {
    this.projects.items.forEach((project) => {
      const FIGURE = project.children[0].childNodes[3];
      let rowPos = project.getAttribute('data-row');
      let leftPost = project.childNodes;
      leftPost = (project.offsetLeft + leftPost[1].offsetLeft);
      rowPos = rowPos.split(',');

      if (window.innerWidth < 640) {
        project.setAttribute('style', `grid-row:${rowPos[0]};`);
        FIGURE.setAttribute('style', `margin-left:-${leftPost}px;`);
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
