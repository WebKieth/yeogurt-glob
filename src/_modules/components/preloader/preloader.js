var preloader;

preloader = function(action) {
  var $, _initPreloader, _removePreloader;
  $ = require('jquery');
  _initPreloader = function() {
    var markup;
    markup = '<div class="preloader"> <div class="preloader__body"></div> </div>';
    return $('body').append(markup);
  };
  _removePreloader = function() {
    preloader = $('body').find('.preloader');
    preloader.fadeOut();
    return preloader.remove();
  };
  switch (action) {
    case 'start':
      return _initPreloader();
    case 'stop':
      return _removePreloader();
  }
};

module.exports = preloader;
