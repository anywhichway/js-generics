var expect;
if(typeof(window)==="undefined") {
	expect = require("chai").expect;
	generic = require('../index.js');
}

describe('generic', function() {
	var sum = generic(function() { throw new Error("can't sum " + JSON.stringify(arguments)); } )
	.method("number","number",
			 function(arg1,arg2) { return arg1 + arg2; })
	.method(function(arg) { return arg instanceof Array;},"number",
			 function(arg1, arg2) { arg1.forEach(function(item,i) { arg1[i] += arg2; }); return arg1; });
	it('number sum ', function() {
		expect(sum(1,2)).to.be.equal(3);
	});
	it('array number sum ', function() {
		var result = sum([0,1],2)
		expect(result[0]===2 && result[1]===3).to.be.true;
	});
	it('should throw error ', function() {
		var result;
		try {
			result = sum(null,1);
		} catch(e) {
			result = e;
		}
		expect(result).to.be.instanceof(Error);
	});
});