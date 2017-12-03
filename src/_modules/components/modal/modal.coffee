modal = (title, desc, modalAction) ->
	$ = require 'jquery'
	module = $ ".modal--response"
	titleField = module.find "[data-res='title']"
	descField = module.find "[data-res='description']"
	titleField.html(title)
	descField.html(desc)
	module.addClass('modal--enabled')
	if modalAction == true
		module.siblings('.modal').removeClass('modal--enabled')
module.exports = modal
