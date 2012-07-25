$( document ).bind( 'mobileinit', function(){
	var defaultTheme = "b";
	$.mobile.listview.prototype.options.headerTheme = defaultTheme;
	$.mobile.page.prototype.options.headerTheme = 'a';
	$.mobile.page.prototype.options.contentTheme = defaultTheme;
	$.mobile.page.prototype.options.footerTheme = 'a';
});