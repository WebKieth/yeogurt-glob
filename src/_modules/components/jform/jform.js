var jform;

jform = function() {
  var $, errorMyField, initValidationSwitch, module, moduleName, setDefault, updatePlaceholder;
  moduleName = 'jform';
  $ = require('jquery');
  module = $("." + moduleName);
  updatePlaceholder = function(thisInput, response) {
    thisInput.removeAttr('placeholder');
    thisInput.attr('placeholder', response);
    return thisInput.val('');
  };
  setDefault = function(thisInput, defPlaceholder) {
    var response;
    response = defPlaceholder;
    updatePlaceholder(thisInput, response);
    return thisInput.removeClass(moduleName + "__field--error");
  };
  errorMyField = function(thisInput, response) {
    thisInput.addClass(moduleName + "__field--error");
    updatePlaceholder(thisInput, response);
    return false;
  };
  initValidationSwitch = function(thisInput) {
    var isMatched, j, len, mainValSwitcher, results, thisInputType, thisInputTypeArray, thisInputVal;
    thisInputType = thisInput.data('type');
    if (thisInputType !== void 0) {
      thisInputTypeArray = thisInput.data('type').split(' ');
      thisInputVal = thisInput.val();
      isMatched = function(value, regexp, err) {
        var response;
        if (value !== '') {
          if (value.match(regexp)) {
            return true;
          } else {
            response = err;
            return errorMyField(thisInput, response);
          }
        } else {
          return true;
        }
      };
      mainValSwitcher = function(thisInputType) {
        var err, regexp, response;
        switch (thisInputType) {
          case 'required':
            if (thisInputVal === '') {
              response = 'Заполните поле';
              errorMyField(thisInput, response);
              return false;
            } else {
              return true;
            }
            break;
          case 'phone':
            err = 'Номер введён неправильно';
            regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
            if (isMatched(thisInputVal, regexp, err) === true) {
              return true;
            } else {
              return false;
            }
            break;
          case "spam":
            if (thisInputVal === '') {
              return true;
            } else {
              response = 'Валидация спама не пройдена';
              return false;
            }
            break;
          case 'date':
            err = 'Неверный формат даты';
            regexp = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/;
            if (isMatched(thisInputVal, regexp, err) === true) {
              return true;
            } else {
              return false;
            }
        }
      };
      results = [];
      for (j = 0, len = thisInputTypeArray.length; j < len; j++) {
        thisInputType = thisInputTypeArray[j];
        results.push((function(thisInputType) {
          if (mainValSwitcher(thisInputType) === true) {
            return true;
          } else {
            return false;
          }
        })(thisInputType));
      }
      return results;
    } else {
      return true;
    }
  };
  return module.each(function() {
    var thisSubmitter;
    thisSubmitter = $(this).find('[type=submit]');
    return thisSubmitter.click(function(e) {
      var XHR, fields, formData, isValid, j, k, len, len1, modal, preloader, ref, thisActiveSubmitter, thisClassMod, thisMod, thisModClassArray, url, validResponseArray, value;
      thisActiveSubmitter = $(this);
      e.preventDefault();
      thisMod = thisActiveSubmitter.parents("form");
      fields = thisMod.find("." + moduleName + "__input");
      isValid = true;
      validResponseArray = [];
      fields.each(function() {
        var defPlaceholder, j, len, ref, thisInput, value;
        thisInput = $(this);
        defPlaceholder = thisInput.attr('placeholder');
        if (defPlaceholder === void 0) {
          defPlaceholder = '';
        }
        ref = initValidationSwitch(thisInput);
        for (j = 0, len = ref.length; j < len; j++) {
          value = ref[j];
          console.log(value);
          if (value === false) {
            validResponseArray.push(false);
          } else {
            validResponseArray.push(true);
          }
        }
        return thisInput.click(function() {
          if (thisInput.val() === '') {
            return setDefault(thisInput, defPlaceholder);
          }
        });
      });
      console.log(validResponseArray);
      for (j = 0, len = validResponseArray.length; j < len; j++) {
        value = validResponseArray[j];
        if (value === false) {
          isValid = false;
        }
      }
      if (isValid) {
        thisModClassArray = thisMod.attr('class').split(' ');
        for (k = 0, len1 = thisModClassArray.length; k < len1; k++) {
          value = thisModClassArray[k];
          if (value.match(/([\s\S]{1,99})--([\s\S]{1,99})/)) {
            thisClassMod = value.replace(/[\s\S]{1,99}--/, '');
            thisActiveSubmitter.attr('name', thisClassMod);
          }
        }
        thisClassMod = thisActiveSubmitter.attr('name');
        formData = new FormData();
        $.fn.serializefiles = function(formData) {
          var obj, params, submitName;
          obj = $(this);
          $.each($(obj).find("input[type='file']"), function(i, tag) {
            return $.each($(tag)[0].files, function(i, file) {
              formData.append(tag.name, file);
              return formData;
            });
          });
          params = $(obj).serializeArray();
          submitName = {
            name: thisClassMod,
            value: thisClassMod
          };
          params.push(submitName);
          $.each(params, function(i, val) {
            formData.append(val.name, val.value);
            return formData;
          });
          return formData;
        };
        formData = thisMod.serializefiles(formData);
        url = (ref = typeof thisMod.attr("action") === 'undefined') != null ? ref : {
          "[[~[[*id]]]]": thisMod.attr("action")
        };
        modal = require('../modal/modal');
        console.log('sending data...');
        preloader = require('../preloader/preloader');
        $(document).ajaxStart(function() {
          return preloader('start');
        });
        $(document).ajaxStop(function() {
          return preloader('stop');
        });
        XHR = $.ajax({
          url: url,
          type: 'POST',
          processData: false,
          contentType: false,
          cache: false,
          data: formData
        });
        XHR.done(function(msg) {
          console.log(msg);
          return modal('Всё прошло отлично', 'Спасибо! Ваша заявка отправлена!', true);
        });
        return XHR.fail(function(error) {
          console.log(error);
          return modal('Возникла ошибка на сервере =(', 'Перезагрузите страницу', false);
        });
      }
    });
  });
};

module.exports = jform;
