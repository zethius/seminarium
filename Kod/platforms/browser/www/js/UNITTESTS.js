define(function(require) {
	var UNITTESTS = {
		memoryLeak: function(){
			for(var i = 0; i < 1000000; i++){
				document.getElementById('MainMenuSetsButton').click();
				document.getElementById('TESTCARD').click();
			}

		}
	};
	return UNITTESTS;
});