export default class Google {
  static gtag() {
    dataLayer.push(arguments);
  }

  init() {
    window.dataLayer = window.dataLayer || [];
    Google.gtag('js', new Date());

    Google.gtag('config', 'UA-38397109-2');
  }
}
