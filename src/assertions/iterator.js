'use strict';
const contract = require('../index.js');
contract.addAssertion
(
	"iterator",
	(data, {model, models, subType}) =>
	{
		const hdl = contract.assertions[subType];
		if (data[Symbol.iterator] === undefined)
			return (false);
		const assertion = contract.assertions[subType];
		if (assertion === undefined)
			return (false);
		for (let entry of data)
			if (contract.validateBool(entry, {assertion, model, models, type: subType}) === false)
				return (false);
		return (true);
	},
	{handleIterableModel: false}
);