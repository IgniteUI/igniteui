﻿/*!@license
* Infragistics.Web.ClientUI Toolbar localization resources <build_number>
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
	$.ig.Toolbar = $.ig.Toolbar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

    $.ig.locale['zh-Hans'].Toolbar = {
			collapseButtonTitle: '折叠 {0}',
			expandButtonTitle: '展开 {0}'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale['zh-Hans'].Toolbar;
	return $.ig.locale['zh-Hans'].Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
