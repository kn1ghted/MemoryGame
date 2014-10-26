///#source 1 1 /AppJs/MemoryGame/app/namespaces.js
angular.module('MemoryGame.controllers',[]);
angular.module('MemoryGame.directives', []);
angular.module('MemoryGame.services', []);
angular.module('MemoryGame.factories', []);
///#source 1 1 /AppJs/MemoryGame/app/factories/cardFactory.js
angular.module('MemoryGame.factories')
.factory('cardFactory', [function() {

	function cardFactory() {

		var guid = (function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}

			return function() {
				return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
					s4() + '-' + s4() + s4() + s4();
			};
		})();

		this.create = function(val) {
			var card = function(v) {
				this.id = guid();
				this.val = v;
				this.flip = function() {
					this.flipped = true;
				};
				this.flipBack = function() {
					this.flipped = false;
				};
				this.flipped = false;
				this.discovered = false;
			};

			return new card(val);
		};
	}

	return new cardFactory();
}]);
///#source 1 1 /AppJs/MemoryGame/app/controllers/c.main.js
angular.module('MemoryGame.controllers')
.controller('mainCtrl', ['$scope', 'gameRuleService', '$rootScope', 'gameInfo'
	, function ($scope, gameRuleService, $rootScope, gameInfo) {
		$scope.cards = $rootScope.cards;
		$scope.gameInfo = gameInfo;
		$scope.flipCard = function (card) {
			gameRuleService.flip(card);
		}
	}]);
///#source 1 1 /AppJs/MemoryGame/app/directives/d.board.js
angular.module('MemoryGame.directives')
.directive('board', [function() {
	return {
		restrict: 'E',
		replace: true,
		transclude:true,
		scope: {
			gameInfo:'='
		},
		templateUrl: '/AppJs/MemoryGame/app/directives/views/d.board.html',
		link: function(scope) {
			
		}
	};
}]);
///#source 1 1 /AppJs/MemoryGame/app/directives/d.card.js
angular.module('MemoryGame.directives')
.directive('card', [function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			model: "=",
			flip: "&"
		},
		templateUrl: '/AppJs/MemoryGame/app/directives/views/d.card.html',
		link: function (scope) {
			scope.showVal = function() {
				if (scope.model.flipped) {
					return scope.model.val;
				}

				return "";
			};
		}
	};
}]);
///#source 1 1 /AppJs/MemoryGame/app/services/deckService.js
angular.module('MemoryGame.services')
	.factory('deckService', ['cardFactory'
		, function (cardFactory) {
		function deckService() {
			var cards;
			this.createDeck = function (numberOfCards) {
				var n = numberOfCards,
					ret = [];
				if (!n || n < 0 || !angular.isNumber(n)) {
					n = 10;
				}

				for (var i = 0, j = 1; i < n; i++, j++) {
					var c = cardFactory.create(i);

					var d = cardFactory.create(i);

					ret.push(c);
					ret.push(d);
				}

				cards = ret;
				return shuffle(ret);
			};

			function shuffle(o) { //v1.0
				for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			};
		}

		return new deckService();
	}]);
///#source 1 1 /AppJs/MemoryGame/app/services/gameRuleService.js
angular.module('MemoryGame.services')
	.factory('gameRuleService', ['$rootScope', 'gameInfo'
		, function ($rootScope, gameInfo) {

			function gameRuleService(cards, gameInfo) {
				var _cards = cards;

				this.flip = function (card) {
					if (thereAreAlready2CardsVisible()) {
						var visibleCards = getVisibleCards();
						if (itIsACouple(visibleCards)) {
							givePoints(visibleCards);
						}
						flipBackCards();
					}
					if (isNotlreadyDiscovered(card)) {
						gameInfo.clicks += 1;
						card.flip();
					}
				};

				function thereAreAlready2CardsVisible() {
					for (var i = 0, j = 0; i < _cards.length; i++) {
						if (_cards[i].flipped && !_cards[i].discovered) {
							j++;
							if (j >= 2) {
								return true;
							}
						}
					}
					return false;
				}

				function getVisibleCards() {
					var ret = [];
					for (var i = 0; i < _cards.length; i++) {
						if (_cards[i].flipped && !_cards[i].discovered) {
							ret.push(_cards[i]);
						}
					}
					return ret;
				}

				function itIsACouple(visibleCards) {

					var card1 = visibleCards[0];
					var card2 = visibleCards[1];

					if (card1.val === card2.val) {
						return true;
					}

					return false;
				}

				function givePoints(visibleCards) {
					gameInfo.score++;
					for (var i = 0; i < visibleCards.length; i++) {
						visibleCards[i].discovered = true;
					}
				}

				function isNotlreadyDiscovered(card) {
					if (!card.discovered) {
						return true;
					}
					return false;
				}

				function flipBackCards() {
					for (var i = 0; i < _cards.length; i++) {
						if (!_cards[i].discovered) {
							_cards[i].flipBack();
						}
					}
				}
			}

			return new gameRuleService($rootScope.cards, gameInfo);
		}]);
///#source 1 1 /AppJs/MemoryGame/app/run.js
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
