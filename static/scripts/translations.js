window.localization = window.localization || {},
function(n) {
    localization.translate = {

      menu: function() {
        $('#welcome-menu').text(i18n.__('Welcome'));
        $('#whoweare-menu').text(i18n.__('Who we are'));
        $('#whatwedo-menu').text(i18n.__('What we do'));
        $('#getintouch-menu').text(i18n.__('Get in touch'));

      },

      welcome: function() {
        $('#welcome').text(i18n.__('Welcome'));
        $('#learn-more-button').text(i18n.__('Learn more'));
      },
      home: function() {
        $('#fn').text(i18n.__('fn'));
        $('#ln').text(i18n.__('ln'));
        $('#agee').text(i18n.__('age'));
      },

      init: function() {
        this.welcome();
        this.menu();
        this.home();
      }
      
    };

    n(function() {
        localization.translate.init();
    })

}(jQuery);
