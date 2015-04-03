/* global ko */
void (function() {
	function VM() {
		this.firstName = ko.observable('')
		this.lastName = ko.observable('')
		this.fullName = ko.computed(function() {
			return this.firstName() + ' ' + this.lastName()
		}, this)
		this.fullNameExists = ko.computed(function() {
			return this.firstName().length > 0 && this.lastName().length > 0
		}, this)
	}
	ko.applyBindings(new VM())
})();
