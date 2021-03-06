/* global ko */
void (function() {

	'use strict'

	var data = [
	  {
		title: 'The Avengers',
		openingGross: 207438708,
		date: '5/4/2012',
		cast:
		  [
			'Robert Downey, Jr.',
			'Chris Hemsworth',
			'Chris Evans'
		  ]
	  },
	  {
		title: 'Iron Man 3',
		openingGross: 174144585,
		date: '5/3/2013',
		cast:
		  [
			'Robert Downey, Jr.',
			'Gwyneth Paltrow',
			'Don Cheadle'
		  ]
	  },
	  {
		title: 'Harry Potter and the Deathly Hallows Part 2',
		openingGross: 169189427,
		date: '7/15/2011',
		cast:
		  [
			'Daniel Radcliffe',
			'Rupert Grint',
			'Emma Watson'
		  ]
	  },
	  {
		title: 'The Dark Knight Rises',
		openingGross: 160887295,
		date: '7/20/2012',
		cast:
		  [
			'Christian Bale',
			'Michael Caine',
			'Anne Hathaway'
		  ]
	  },
	  {
		title: 'The Dark Knight',
		openingGross: 158411483,
		date: '7/18/2008',
		cast:
		  [
			'Christian Bale',
			'Heath Ledger',
			'Aaron Eckhart'
		  ]
	  },
	  {
		title: 'The Hunger Games',
		openingGross: 152535747,
		date: '3/23/2012'
	  }
	]

	function VM(movies) {
		var vm = this
		vm.movies = movies
		vm.search = ko.observable('')
		vm.filter = ko.computed(function() {
			var search = vm.search().toLowerCase()
			if (!search) {
				return vm.movies
			} else {
				return ko.utils.arrayFilter(vm.movies, function(movie) {
					return movie.title.toLowerCase().indexOf(search) !== -1
				})
			}
		})
	}

	ko.applyBindings(new VM(data))

})();
