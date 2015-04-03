/* global ko */
void (function() {

	'use strict'

	function VM() {
		var vm = this

		vm.name = ko.observable('')
		vm.name.validationMessage = ko.observable('')
		vm.name.validationClass = ko.observable('')
		vm.name.hasError = ko.observable(true)
		vm.name.isValid = ko.observable(false)

		vm.age = ko.observable('')
		vm.age.validationMessage = ko.observable('')
		vm.age.validationClass = ko.observable('')
		vm.age.isValid = ko.observable(false)

		vm.name.subscribe(function() {
			var isValid = vm.name().length > 0
			var message = isValid ? 'Good.' : 'Please enter a name.'
			var cssClass = isValid ? 'alert-success' : 'alert-error'
			vm.name.validationMessage(message)
			vm.name.validationClass(cssClass)
			vm.name.isValid(isValid)
		})

		vm.age.subscribe(function() {
			var isValid = (vm.age().length > 0 && !isNaN(vm.age()))
			var message = isValid ? 'Good.' : 'Please enter a valid number.'
			var cssClass = isValid ? 'alert-success' : 'alert-error'
			vm.age.validationMessage(message)
			vm.age.validationClass(cssClass)
			vm.age.isValid(isValid)
		})

		vm.isValid = ko.computed(function() {
			return (vm.name.isValid() && vm.age.isValid())
		})
	}

	ko.applyBindings(new VM())

})();
