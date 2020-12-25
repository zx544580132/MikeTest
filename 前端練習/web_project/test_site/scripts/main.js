function validation() {
	var a = document.forms["myform"]["myname"].value;
	var b = document.forms["myform"]["intro"].value;
	var c = document.forms["myform"]["edu"].value;
	var d = document.myform.gender;
	

	if (a == "" || a == null) {
		alert("請輸入姓名");
		return false;
	}
	
	if (b == "" || b == null) {
		alert("請輸入自傳");
		return false;
	}
	
	if (c == "請選擇") {
		alert("請選擇學歷");
		return false;
	}
	
	for(var i=0; i < d.length; i++){

		if(d[i].checked == true){
			return true;
			}
		
	}alert("請選擇性別");
	return false;
	
} 