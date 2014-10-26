angular.module('MemoryGame.services')
	.factory('gameRuleService', ['$rootScope', 'gameInfo'
		, function ($rootScope, gameInfo) {

			function gameRuleService(cards, gameInfo) {
				var _cards = cards;

				this.flip = function (card) {
					if (thereAreAlready2CardsVisible()) {
						var visibleCards = getVisibleCards();
						if (itIsACouple(visibleCards)) {
							setCardsAsDiscovered(visibleCards);
							givePoints();
						}
						flipBackCards();
					}
					if (isNotlreadyDiscovered(card)) {
						if(!card.flipped) {
							gameInfo.clicks += 1;
							card.flip();
						}
						givePoints();
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

				function setCardsAsDiscovered(visibleCards) {
					for (var i = 0; i < visibleCards.length; i++) {
						visibleCards[i].discovered = true;
					}
				}

				function givePoints() {
					for (var i = 0, j = 0; i < _cards.length; i++) {
						if (_cards[i].discovered) {
							j++;
						}
					}

					gameInfo.score = j;
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