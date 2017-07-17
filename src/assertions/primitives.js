'use strict';
const contract = require('../index.js');
const primitives = Object.freeze
({
	[Boolean]:	'boolean',
	[String]:		'string',
	[Number]:		'number',
	[Object]:		'object'
});
contract.addAssertion
(
	"primitive", (data, {model, precomputed: type}) =>
	(
				((type === primitives[model]) ||
				(data instanceof model)) ?
				true : false
	),
	{precomputed: data => typeof data}
);