// eslint-disable-next-line
import Google from './components/google.js';
// eslint-disable-next-line
import Navigation from './components/navigation.js';
// eslint-disable-next-line
import Home from './components/home.js';
// eslint-disable-next-line
import Project from './components/project.js';

document.addEventListener('DOMContentLoaded', () => {
  const PAGE = {
    home: (!!document.querySelector('.page-home')),
    about: (!!document.querySelector('.page-about')),
    project: (!!document.querySelector('.page-project')),
  };

  const GOOGLE = new Google();
  GOOGLE.init();

  const NAVIGATION = new Navigation();
  NAVIGATION.init();

  if (PAGE.home) {
    const HOME = new Home();
    HOME.init();
  }

  if (PAGE.project) {
    const PROJECT = new Project();
    PROJECT.init();
  }
});
