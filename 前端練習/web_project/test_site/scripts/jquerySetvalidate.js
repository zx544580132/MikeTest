$(document).ready( function () {
	$("form").submit ( function () {
	var a = $("#myname").val();
	var b = $("#intro").val();
	var c = $("#edu").val();
	var d = $("input[name='gender']:checked").val();

		if (a === "") {
			alert ("請填入你的姓名");
			return false;
		}else if (typeof(d) === "undefined") {
			alert ("請選擇你的性別");
			return false;
		}else if (c === "請選擇") {
			alert ("請選擇你的學歷");
			return false;
		}else if (b === "") {
			alert ("請填寫自傳");
			return false;
		}else {
			return ture;
		}

	})
});