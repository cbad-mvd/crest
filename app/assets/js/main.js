function test() {
	return;
}

var headerBG_red = "#e60c26";
var headerBG_yellow = "#fccc25";
var headerBG_blue = "#0090d3";
var headerBG_purple = "#7b74b6";
var headerBG_orange = "#f7931e";
var headerBG_lime = "#bbd63e";

var quoteBG_purple = "#eae9f3";
var quoteBG_red = "#fee7e9";
var quoteBG_blue = "#e7f8ff";
var quoteBG_yellow = "#fef5d5";
var quoteBG_orange = "#fef2e3";
var quoteBG_lime = "#f6fae6";

// @ts-ignore
$(document).ready(function() {
	function setMainHeader() {
		var bgColor = headerBG_purple;
		var qColor = quoteBG_purple;
		var txtColor = "#f7f5f4";
		//alert($("#switch").val());
		// @ts-ignore
		switch ($("#switch").val()) {
			case "red":
				bgColor = headerBG_red;
				qColor = quoteBG_red;
				break;

			case "blue":
				bgColor = headerBG_blue;
				qColor = quoteBG_blue;
				break;

			case "purple":
				bgColor = headerBG_purple;
				qColor = quoteBG_purple;
				break;

			case "yellow":
				bgColor = headerBG_yellow;
				qColor = quoteBG_yellow;
				txtColor = "#222";
				break;

			case "orange":
				bgColor = headerBG_orange;
				qColor = quoteBG_orange;
				break;

			case "lime":
				bgColor = headerBG_lime;
				qColor = quoteBG_lime;
				txtColor = "#222";
				break;
		}

		// @ts-ignore
		$(".mainheader").css("background-color", bgColor);
		// @ts-ignore
		$(".testimonials .full-wrapper").css("background-color", qColor);

		if (txtColor) {
			// @ts-ignore
			$(".global-nav li a").css("color", txtColor);
		}
	}

	// @ts-ignore
	setMainHeader();

	// @ts-ignore
	$("#switch").change(function() {
		setMainHeader();
	});
});
