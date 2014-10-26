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