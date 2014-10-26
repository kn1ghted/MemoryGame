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