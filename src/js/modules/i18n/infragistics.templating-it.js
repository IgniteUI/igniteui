﻿/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.it = $.ig.locale.it || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.it.Templating = {
			undefinedArgument: 'Si è verificato un errore durante il tentativo di recuperare la proprietà dell\'origine dati: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.it.Templating;
	return $.ig.locale.it.Templating;
}));// REMOVE_FROM_COMBINED_FILES
