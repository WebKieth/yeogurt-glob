var callmodule;

callmodule = function() {
  var $, callBtn;
  $ = require('jquery');
  callBtn = $('[data-call]');
  return callBtn.click(function(e) {
    var calledModule, thisCall;
    e.preventDefault();
    thisCall = $(this).data('call');
    calledModule = $("." + thisCall);
    if (thisCall.match(/([\s\S]{1,99})--([\s\S]{1,99})/)) {
      thisCall = thisCall.replace(/--[\s\S]{1,99}/, '');
    }
    calledModule.toggleClass(thisCall + "--enabled");
    return $(document).keyup(function(e) {
      if (e.keyCode === 27 && calledModule !== void 0) {
        return calledModule.removeClass(thisCall + "--enabled");
      }
    });
  });
};

module.exports = callmodule;
