
jform = ->

  moduleName = 'jform'
  $ = require 'jquery'
  module = $ ".#{moduleName}"

  #updater
  updatePlaceholder = (thisInput, response)->
    thisInput.removeAttr 'placeholder'
    thisInput.attr 'placeholder', response
    thisInput.val ''

  #set placeholder to default
  setDefault = (thisInput, defPlaceholder)->
    response = defPlaceholder
    updatePlaceholder(thisInput, response)
    thisInput.removeClass "#{moduleName}__field--error"

  #errorHandler
  errorMyField = (thisInput, response)->
    thisInput.addClass "#{moduleName}__field--error"
    updatePlaceholder(thisInput, response)
    return false


  #main switcher
  initValidationSwitch = (thisInput) ->
    thisInputType = thisInput.data('type')
    if thisInputType != undefined
      thisInputTypeArray = thisInput.data('type').split(' ')
      thisInputVal = thisInput.val()
      isMatched = (value, regexp, err)->
        if value != ''
          if value.match regexp
            #console.log value, 'isMatched: true'
            return true
          else
            response = err
            #console.log value, 'isMatched: false'
            errorMyField(thisInput,response)
        else
          #console.log value, 'isMatched: true'
          return true


      mainValSwitcher = (thisInputType) ->
        switch thisInputType
          when 'required'
            if thisInputVal == ''
              response = 'Заполните поле'
              errorMyField(thisInput,response)
              #console.log 'data type required -> false'
              return false

            else
              return true

          when 'phone'
            err = 'Номер введён неправильно'
            regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
            if isMatched(thisInputVal, regexp, err) == true
              #console.log 'data type phone match -> true'
              return true
            else
              #console.log 'data type phone match -> false'
              return false
          when "spam"
            if thisInputVal is ''
              return true
            else
              response = 'Валидация спама не пройдена'
              #console.log 'data type spam -> false'
              return false

          when 'date'
            err = 'Неверный формат даты'
            regexp = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/
            if isMatched(thisInputVal, regexp, err) == true
              return true
            else
              #console.log 'data type date match -> false'
              return false
      for thisInputType in thisInputTypeArray
        do (thisInputType) ->
          if mainValSwitcher(thisInputType) == true
            #console.log 'mainValSwitcher is true'
            return true
          else
            #console.log 'mainValSwitcher is false'
            return false
    else
      return true
  #main action
  module.each ->
    #form submit
    thisSubmitter =  $ this
    .find '[type=submit]'
    thisSubmitter.click (e) ->
      thisActiveSubmitter = $ this
      e.preventDefault()
      thisMod = thisActiveSubmitter.parents "form"
      fields = thisMod.find ".#{moduleName}__input"
      #each jform__input
      isValid = true
      validResponseArray = []
      fields.each ->
        thisInput = $ this
        defPlaceholder = thisInput.attr 'placeholder'
        if defPlaceholder == undefined
          defPlaceholder = ''
        #validation function call. if jform__input hasn't data-type, then return true
        for value in initValidationSwitch(thisInput)
          console.log value
          if value == false
            validResponseArray.push(false)
          else
            validResponseArray.push(true)
          #get this module form modificator to button name and concat with ajax request
        thisInput.click ->
          if thisInput.val() == ''
            setDefault(thisInput, defPlaceholder)
      console.log validResponseArray
      for value in validResponseArray
        if value == false
          isValid = false
      if isValid
        thisModClassArray = thisMod.attr('class').split(' ')
        for value in thisModClassArray
          if value.match /([\s\S]{1,99})--([\s\S]{1,99})/
            thisClassMod = value.replace /[\s\S]{1,99}--/, ''
            thisActiveSubmitter.attr 'name', thisClassMod
        thisClassMod = thisActiveSubmitter.attr 'name'
        # formData = thisMod.formSerialize()
        formData = new FormData()
        $.fn.serializefiles = (formData)->
            obj = $ this
            $.each $(obj).find("input[type='file']"), (i, tag) ->
              $.each $(tag)[0].files, (i, file) ->
                formData.append tag.name, file
                return formData
            params = $(obj).serializeArray();
            submitName = {
              name: thisClassMod
              value: thisClassMod
            }
            params.push submitName
            $.each params, (i, val) ->
              formData.append val.name, val.value
              return formData
            return formData;
        formData = thisMod.serializefiles(formData)

        url = (typeof thisMod.attr("action") == 'undefined') ? "[[~[[*id]]]]" : thisMod.attr("action")
        modal = require '../modal/modal'
        console.log 'sending data...'
        preloader = require '../preloader/preloader'
        $(document).ajaxStart ->
          preloader('start')
        $(document).ajaxStop ->
          preloader('stop')
        XHR = $.ajax
          url: url
          type: 'POST'
          processData: false
          contentType: false
          cache: false,
          data: formData
        XHR.done (msg)->
          console.log msg
          modal('Всё прошло отлично','Спасибо! Ваша заявка отправлена!', true)
        XHR.fail (error) ->
          console.log error
          modal('Возникла ошибка на сервере =(','Перезагрузите страницу', false)
module.exports = jform;
