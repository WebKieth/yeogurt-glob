var floatLabel;

floatLabel = function(param) {
  var $, field;
  $ = require('jquery');
  field = $(".jFloatField");
  return field.each(function() {
    var changeInputs, thisField, thisInput, thisLabel;
    thisField = $(this);
    thisLabel = thisField.find(".jFloatLabel");
    thisInput = thisField.find(".jFloatInput");
    changeInputs = function(qthisInput) {
      var thisInputValue, thisPlaceholder;
      thisInputValue = qthisInput.val();
      thisPlaceholder = qthisInput.attr('placeholder');
      if ((thisPlaceholder === '' || thisPlaceholder === void 0) && thisInputValue === '') {
        return thisLabel.removeClass("to-top");
      } else {
        return thisLabel.addClass('to-top');
      }
    };
    thisInput.focusin(function() {
      return thisLabel.addClass('to-top');
    });
    thisInput.focusout(function() {
      return changeInputs($(this));
    });
    return thisInput.change(function() {
      return changeInputs($(this));
    });
  });
};

module.exports = floatLabel;
