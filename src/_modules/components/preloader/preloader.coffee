
preloader = (action) ->
  $ = require 'jquery'
  _initPreloader = ->
    markup = '
    <div class="preloader">
      <div class="preloader__body"></div>
    </div>'
    $('body').append(markup)
  _removePreloader = ->
    preloader = $('body').find('.preloader')
    preloader.fadeOut()
    preloader.remove()
  switch action
    when 'start'
      _initPreloader()
    when 'stop'
      _removePreloader()

module.exports = preloader
