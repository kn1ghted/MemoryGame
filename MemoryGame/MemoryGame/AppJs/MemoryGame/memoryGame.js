///#source 1 1 /AppJs/MemoryGame/app/namespaces.js
angular.module('MemoryGame.controllers',[]);
angular.module('MemoryGame.directives',[]);
///#source 1 1 /AppJs/MemoryGame/app/controllers/c.main.js
angular.module('MemoryGame.controllers')
.controller('mainCtrl', ['$scope'
	, function ($scope) {

	}]);
///#source 1 1 /AppJs/MemoryGame/app/directives/d.board.js
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
///#source 1 1 /AppJs/MemoryGame/app/directives/d.card.js
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
///#source 1 1 /AppJs/MemoryGame/app/run.js
angular.module('MemoryGame', [
	'MemoryGame.controllers',
	'MemoryGame.directives'
]);
