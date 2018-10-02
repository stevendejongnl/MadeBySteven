export default class Google {
  static gtag() {
    // eslint-disable-next-line
    dataLayer.push(arguments);
  }

  // eslint-disable-next-line
  init() {
    window.dataLayer = window.dataLayer || [];
    Google.gtag('js', new Date());

    Google.gtag('config', 'UA-38397109-2');
  }
}
