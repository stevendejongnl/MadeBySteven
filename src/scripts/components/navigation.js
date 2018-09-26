export default class Navigation {
  constructor() {
    this.menu = {
      open: document.querySelector('#openMenu'),
      navigation: document.querySelector('#navigation'),
    };

    this.project = {
      open: document.querySelector('#openProjects'),
      container: document.querySelector('#projects'),
      items: document.querySelectorAll('#projects .project__item'),
      active: document.querySelector('.navigation__item--active'),
    };

    this.parentProject = this.project.open.closest('.navigation__item');
  }

  init() {
    this.menu.open.addEventListener('click', (event) => {
      this.open(event);
    });

    this.project.open.addEventListener('click', (event) => {
      this.projects(event);
    });

    this.project.items.forEach((navProject) => {
      const projectData = {
        item: navProject,
        figure: navProject.querySelector('figure'),
        name: navProject.getAttribute('data-name'),
        slug: navProject.getAttribute('data-slug'),
        image: navProject.getAttribute('data-image'),
      };

      projectData.figure.addEventListener('mouseenter', () => {
        projectData.item.querySelector('span').innerHTML = 'View';
      });

      projectData.figure.addEventListener('mouseleave', () => {
        projectData.item.querySelector('span').innerHTML = projectData.name;
      });
    });
  }

  open(event) {
    event.preventDefault();

    this.menu.open.classList.toggle('button--open');
    this.menu.navigation.classList.toggle('navigation__open');

    if (this.project.container.classList.contains('project__container--open')) {
      this.project.container.classList.remove('project__container--open');
      this.project.active.classList.toggle('navigation__item--active');
      this.parentProject.classList.toggle('navigation__item--active');
    }
  }

  projects(event) {
    event.preventDefault();

    this.project.container.classList.toggle('project__container--open');
    this.project.active.classList.toggle('navigation__item--active');
    this.parentProject.classList.toggle('navigation__item--active');
  }
}
