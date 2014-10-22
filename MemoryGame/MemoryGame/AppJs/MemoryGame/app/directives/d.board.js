angular.module('MemoryGame.directives')
.directive('board', [function() {
	return {
		restrict: 'E',
		replace: true,
		transclude:true,
		scope: {},
		templateUrl: '/AppJs/MemoryGame/app/directives/views/d.board.html',
		link: function(scope) {
			
		}
	};
}]);