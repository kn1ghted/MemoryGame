angular.module('MemoryGame', [
	'MemoryGame.controllers',
	'MemoryGame.directives',
	'MemoryGame.services',
	'MemoryGame.factories'
]).constant('gameInfo', {
	clicks: 0,
	score: 0,
	cards: 18
}).run(['$rootScope', 'deckService', 'gameInfo'
	, function ($rootScope, deckService, gameInfo) {
		$rootScope.cards = deckService.createDeck(gameInfo.cards);
	}])
;