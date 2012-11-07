function Poly(terms) {
	this.terms = [];
	if (Object.prototype.toString.call(terms) === '[object Array]') {
		this.terms = terms;
	} else if (typeof terms === "string") {
		this.terms = Poly.toArray(terms);
	}

}

Poly.prototype.toString = function() {
	var str = "";
	for ( var i = this.terms.length - 1; i >= 0; i--) {
		var coeff = toNumber(this.terms[i]);
		if (coeff == 0)
			continue;

		var term = "" + coeff;

		if (i == 0)
			;
		else if (i == 1)
			term = term + "x";
		else
			term += "x^" + i;

		if (coeff > 0 && str != "")
			term = "+" + term;

		str += term.replace(/x\^0/, "").replace(/(x\^1$)|(^1x)/, "x").replace(
				/([+-])1x/, "$1x");
	}
	return str ? str : "0";
};

function toNumber(value) {
	if (value === undefined)
		return 0;
	return +value;
}

Poly.toArray = function(str) {
	var s = str.toString();

	s = s.replace(/([+-])/g, "|$1");

	var terms = s.split("|");
	var array = [];

	/*
	 * 1 - coeff 
	 * 2 - x^2 
	 * 3 - ^2 
	 * 4 - exp
	 * 
	 *            1         2 3  4 */
	var regex = /^([+-]?\d*)(x(\^(\d+))?)?/;

	for ( var i = 0; i < terms.length; i++) {
		var m = regex.exec(terms[i]);

		var coeff = 0;

		switch (m[1]) {
		case "+":
		case "":
			coeff = 1;
			break;

		case "-":
			coeff = -1;
			break;
		default:
			coeff = toNumber(m[1]);
		}

		var exp = 0;
		if (m[2] != undefined && m[4] === undefined)
			exp = 1;
		else
			exp = toNumber(m[4]);

		array[exp] = coeff + toNumber(array[exp]);
	}

	return array;
};

Poly.prototype.add = function(other) {
	var newTerms = [];
	for ( var i = 0; i < this.terms.length || i < other.terms.length; i++) {
		newTerms[i] = toNumber(this.terms[i]) + toNumber(other.terms[i]);
	}
	return new Poly(newTerms);
};

function init() {
	var button = $('button#plus');
	button.click(function(e) {
		e.preventDefault();
		
		var p1str = $("input#poly1").val().replace(/ /g, "");
		var p2str = $("input#poly2").val().replace(/ /g, "");

		var output = $("output#result")[0];

		if(!validate(p1str) || !validate(p2str)){
			output.innerHTML = "check input!<br>ex: x^2+x-1";
			return;
		}
		
		var p1 = new Poly(p1str);
		var p2 = new Poly(p2str);

		output.innerHTML = p1.add(p2).toString();
	});
};

function validate(poly){
	var regex = /^[x\d\^+-]*$/;
	return regex.test(poly);
};

