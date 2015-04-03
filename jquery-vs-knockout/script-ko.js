var ViewModel = function() {
	this.fakeServerData = ['Really Want', 'Kinda Want']

	this.wishes = ko.observableArray([])
	this.currentWish = ko.observable('')
	this.currentLevel = ko.observable('')

	this.addWish = function() {
		var itemText = this.currentWish() + ' - ' + this.currentLevel()
		this.wishes.push(itemText)
		console.log(this.wishes())
	}
}

ko.applyBindings(new ViewModel())
