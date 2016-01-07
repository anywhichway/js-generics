# js-generics
A generic function definition and multi-dispatch library for Javascript.

[![Codacy Badge](https://api.codacy.com/project/badge/grade/9fa47bc000d84db4b1336fc61e38fb58)](https://www.codacy.com/app/syblackwell/js-generics)

# Installation

npm install js-generics

The index.js and package.json files are compatible with [node-require](http://www.github.com/anywhichway/joqular) so that js-generics can be served directly to the browser from the node-modules/js-generics directory when using node Express.

# Usage

Multi-dispatch generic functions support the selection and execution of a function based on the types and number of arguments. A common use is supporting mathematical operations on different types of objects. For example:

```
var sum = generic(function() { throw new Error("can't sum " + JSON.stringify(arguments)); } )
	.method("number","number",
			 function(arg1,arg2) { return arg1 + arg2; })
	.method(function(arg) { return arg instanceof Array;},"number",
			 function(arg1, arg2) { arg1.forEach(function(item,i) { arg1[i] += arg2; }); return arg1; });
```

In the example above the generic function *sum* is defined to throw an error if no matching dispatch can be found. Matching dispatches have two arguments of type number or a first argument of kind array and a second of type number.

The general form of usage is:

```
generic(<default function>).method(<type matcher>[,<type matcher>...],<function to call>)[.method(<type matcher>[,<type matcher>...],<function to call>),...]
```

*\<default function\>* - This function is called if no matching dispatches are found. It can take any form and is called as *<default function>.apply(this,arguments)*. As a result generic functions can be included as methods on objects.

*\<type matcher\>* - These should be primitive type names or functions. If a function, it's sole responsibility is to return *true* or *false* if the argument type is correct. The number of \<type matcher\> must match the number of arguments to \<function to call\>, or the last \<type matcher\> be the special value *generic.VARGS*.

*\<function to call\>* - This function does the desired work. It is called as *\<type matcher\>.apply(this,arguments)*.

.*method* calls can be chained and the last matching method is the one invoked by the dispatcher.

# Release History (reverse chronological order)

v0.0.5 2016-01-03 Added unit tests and documentation.

v0.0.4 2015-12-13 Codacy improvements

v0.0.3 2015-12-13 Initial public commit.

# License

MIT License - see LICENSE file
