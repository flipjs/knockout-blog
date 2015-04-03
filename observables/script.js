/* global google, ko */
function MapViewModel(mapId, options) {
	this.map = new google.maps.Map(document.getElementById(mapId), options)
	this.geocoder = new google.maps.Geocoder()
	this.currentLat = ''
	this.currentLong = ''
	this.placeToAdd = ''
	this.searchHistory = ko.observableArray([])
	this.markers = []

	this.validationMessage = ko.observable('')
	this.validationClass = ko.observable('')

}

var CacheStatus = {
	NA: 0,
	MARKER: 1,
	HISTORY: 2
}

MapViewModel.prototype.deleteMarkers = function() {
	var markerLength = this.markers.length - 1
	while (markerLength >= 0) {
		var marker = this.markers[markerLength]
		marker.setMap(null)
		this.markers.pop()
		markerLength--
	}
}

function CacheCheck(search, status) {
	this.search = search
	this.status = status
}

function Search(place, location) {
	this.place = place
	this.location = location
}

MapViewModel.prototype.findPlace = function(place) {
	return ko.utils.arrayFirst(this.searchHistory(), function(search) {
		return search.place.toLowerCase() === place.toLowerCase()
	})
}

MapViewModel.prototype.findMarker = function(location) {
	return ko.utils.arrayFirst(this.markers, function(marker) {
		return (marker.position.lat() === location.lat() && marker.position.lng() === location.lng())
	})
}

MapViewModel.prototype.checkCache = function() {
	var cacheStatus = CacheStatus.NA,
	place = this.placeToAdd,
	searchedPlace

	// check for markers
	searchedPlace = this.findPlace(place)
	if (searchedPlace) {
		var marker = this.findMarker(searchedPlace.location)
		cacheStatus = marker ? CacheStatus.MARKER : CacheStatus.HISTORY
	}
	return new CacheCheck(searchedPlace, cacheStatus)
}

MapViewModel.prototype.search = function() {
	var cacheCheck = this.checkCache()

	switch(cacheCheck.status) {
		case CacheStatus.NA:
			this.locate()
			console.log('Fresh lookup')
			break
		case CacheStatus.MARKER:
			this.setCenter(cacheCheck.search.location)
			console.log('Center set to existing marker...')
			break
		case CacheStatus.HISTORY:
			var marker = this.createMarker(cacheCheck.search.location)
			this.setCenter(cacheCheck.search.location)
			this.markers.push(marker)
			console.log('Marker added from history')
			break
	}
}

MapViewModel.prototype.locate = function() {
	var self = this
	self.geocoder.geocode({ 'address': self.placeToAdd }, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var location = results[0].geometry.location
			self.setCenter(location)
			var marker = self.createMarker(location)
			self.searchHistory.push(new Search(self.placeToAdd, location))
			self.markers.push(marker)
			self.currentLat = location.lat()
			self.currentLong = location.lng()
			self.validationMessage('Marker inserted at ' + self.currentLat + ', ' + self.currentLong)
			self.validationClass('alert-success')
		} else {
			self.validationMessage('You entered a bad data...')
			self.validationClass('alert-error')
		}
	})
}

MapViewModel.prototype.isValid = function(lat, long) {
	var isValid = (lat.length > 0 && !isNaN(lat)) && (long.length > 0 && !isNaN(long))
	console.log(isValid)
	return isValid
}

MapViewModel.prototype.createMarker = function(position) {
	return new google.maps.Marker({
		position: position,
		map: this.map
	})
}

MapViewModel.prototype.addMarker = function() {
	var isValid = this.isValid(this.currentLat, this.currentLong)
	if (isValid) {
		var position = new google.maps.LatLng(this.currentLat, this.currentLong)
		this.createMarker(position)
		this.setCenter(position)
		this.validationMessage('Marker inserted at ' + this.currentLat + ', ' + this.currentLong)
		this.validationClass('alert-success')
	} else {
		this.validationMessage('You entered a bad data...')
		this.validationClass('alert-error')
	}
}

MapViewModel.prototype.setCenter = function(position) {
	this.map.setCenter(position)
}

var mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng(-34.397, 150.644),
	mapTypeId: google.maps.MapTypeId.ROADMAP
}

var vm = new MapViewModel('map', mapOptions)

ko.applyBindings(vm)

