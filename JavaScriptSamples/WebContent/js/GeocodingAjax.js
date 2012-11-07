function geocode(address) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				alert(xhr.responseText);
			}
		}
	};

	var url = 'http://maps.googleapis.com/maps/api/geocode/json?';

	url =  url + 'address=' + encodeURIComponent(address) + '&sensor=false';
	xhr.open('GET', url);
	xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jan 1970 00:00:00 GMT');
	xhr.send(null);
}

function onClickBtn(){
	var input = document.getElementById('address');
	var address = input.value;
	geocode(address);

}