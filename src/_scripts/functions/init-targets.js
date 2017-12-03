var initTargets;

initTargets = function() {
  var $, targetBtn;
  $ = require('jquery');
  targetBtn = $('[data-target]');
  return targetBtn.click(function(e) {
    var thisTarget;
    e.preventDefault();
    thisTarget = $(this).data('target');
    yaCounterXXXXXXXX.reachGoal(thisTarget);
    return true;
  });
};

module.exports = initTargets;
