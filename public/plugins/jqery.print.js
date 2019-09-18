"use strict";

;(function ($) {
	var printAreaCount = 0;
	$.fn.printArea = function () {
		var old = $("iframe[id*=printArea]");
		if (old.length) old.remove();
		var ele = $(this);
		var idPrefix = "printArea_";
		removePrintArea(idPrefix + printAreaCount);
		printAreaCount++;
		var iframeId = idPrefix + printAreaCount;
		var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
		var iframe = document.createElement('IFRAME');
		$(iframe).attr({ style: iframeStyle, id: iframeId });
		document.body.appendChild(iframe);
		var doc = iframe.contentWindow.document;
		$(document).find("link").filter(function () {
			return $(this).attr("rel").toLowerCase() == "stylesheet";
		}).each(function () {
			doc.write('<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >');
		});
		$(document).find("style").each(function () {
			doc.write('<style>' + $(this).html() + '</style>');
		});
		var html = $(ele).html().replace(/scroll-wrapper/g, '');
		doc.write('<div class="' + $(ele).attr("class") + '">' + html + '</div>');
		doc.close();
		var frameWindow = iframe.contentWindow;
		frameWindow.close();
		frameWindow.focus();
		setTimeout(function () {
			frameWindow.print();
		}, 160);
	};
	var removePrintArea = function removePrintArea(id) {
		$("iframe#" + id).remove();
	};
})(jQuery);
