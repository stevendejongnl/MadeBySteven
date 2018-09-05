export default class Navigation {
  constructor() {
    this.menu = {
      open: document.querySelector('#openMenu'),
      navigation: document.querySelector('#navigation'),
    };

    this.project = {
      open: document.querySelector('#openProjects'),
      items: document.querySelector('#projects'),
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
  }

  open(event) {
    event.preventDefault();

    this.menu.open.classList.toggle('button--open');
    this.menu.navigation.classList.toggle('navigation__open');

    if (this.project.items.classList.contains('project__container--open')) {
      this.project.items.classList.remove('project__container--open');
      this.project.active.classList.toggle('navigation__item--active');
      this.parentProject.classList.toggle('navigation__item--active');
    }
  }

  projects(event) {
    event.preventDefault();

    this.project.items.classList.toggle('project__container--open');
    this.project.active.classList.toggle('navigation__item--active');
    this.parentProject.classList.toggle('navigation__item--active');
  }
}
