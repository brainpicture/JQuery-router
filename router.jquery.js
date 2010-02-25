(function($){

$.router = function(){
	// Private
	var request={};
	var self = this;
	var cur_url = '';
	var handlers={};
	// Public
	// Парсинг url
	$.router.parseRequest = function() {
		var paramsStart=location.href.indexOf('#');
		if (paramsStart!=-1)
			var url = location.href.substring(paramsStart+2,location.href.length).split('/');
		else
			var url='';
		request={};
		for (var key in url) {
			var param = url[key].split('=');
			if (param[0]!='') request[param[0]]=((param.length==1)?(true):(param[1]));
		}
	}
	
	// Добавить обработчик изменения параметра в url
	$.router.addHandler=function(key,handler) {
		handlers[key]=handler;
		handlers[key](request);
	};
	
	// Добавить обработчик изменения параметра в url
	$.router.removeHandler=function(key) {
		delete handlers[key]
	};
	
	$.router.get=function(key) {
		if (typeof(request[key])=='undefined') return false;
		else return request[key];
	}
	// Сменяет параметры на странице
	$.router.set=function(object) {
		for (key in object) {
			if (object[key]!=false) request[key]=object[key];
			else delete request[key];
		}
		var link='#';
		for (key in request) {
			link+='/'+key;
			if (typeof(request[key])!='boolean') link+='='+request[key];
		}
		location.href=link;
		$.router.check();
	}
	
	// Проверка не изменили ли url
	$.router.check = function() {
		if (cur_url != location.href) {
			cur_url = location.href;
			$.router.parseRequest();
			for (key in handlers) {
				handlers[key](request);
			}
			//$.router.onChange(request);
		}
	}
	
	// Конструктор
	var construct=function() {
		$.router.check();
		setInterval($.router.check,200);
	}();
	return self;
};
	
})(jQuery);

$(document).ready(function() {
	$.router();
});
