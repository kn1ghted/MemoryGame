angular.module('MemoryGame.controllers')
.controller('mainCtrl', ['$scope', 'gameRuleService', '$rootScope', 'gameInfo'
	, function ($scope, gameRuleService, $rootScope, gameInfo) {
		$scope.cards = $rootScope.cards;
		$scope.gameInfo = gameInfo;
		$scope.flipCard = function (card) {
			gameRuleService.flip(card);
		}
	}]);