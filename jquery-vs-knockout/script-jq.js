var fakeServerData = ['Really Want', 'Kinda Want']
var $level = $('#wish-desire-level')
var $buttonAdd = $('#button-add')
var $list = $('#wish-list')
var $item = $('#wish-item')

$.each(fakeServerData, function(key, value) {
	$level.append($('<option>', {
		text: value
	}))
})

$buttonAdd.on('click', function() {
	// 1. Travel to space - Really Want
	// 2. Eat pie - Kinda Want
	var itemText = $item.val() + ' - ' + $level.children(':selected').text()
	$list.append($('<li>', {
		text: itemText
	}))

})
