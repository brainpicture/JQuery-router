== Router JQuery plugin ==
For one page web applications.
Generate anchor urls like:
	http://example.com/#/act=wow
Usage:
	$.router.addHandler('id for current routing',function(get) {
		var act = $.router.get('act'); // getting router param
	});
	
	$.router.set({act:'wow'}); // Setting router params
