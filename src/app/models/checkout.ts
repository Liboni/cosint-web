export class Checkout {
  static file(data: any) {
      let url = window.URL.createObjectURL(data.body);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
  }
}
