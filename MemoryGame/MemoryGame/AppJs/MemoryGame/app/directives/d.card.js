angular.module('MemoryGame.directives')
.directive('card', [function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: '/AppJs/MemoryGame/app/directives/views/d.card.html',
		link: function (scope) {

		}
	};
}]);