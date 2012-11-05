function test() {
	var fragment = document.createDocumentFragment();
	for ( var i = 0; i < 10; i++) {
		var child = document.createElement('div');

		fragment.appendChild(child);
	}

	document.getElementById('parent').appendChild(fragment);
}