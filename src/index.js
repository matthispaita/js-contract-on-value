'use strict';
const contract = (() =>
{
	let isFreeze = false;
	const contract = (type, model, subType) =>
	{
		const assertion = contract.assertions[type];
		if (assertion === undefined)
			throw new TypeError('contract@type: shall be a reference to a method of contract.assertions');
		const out = {assertion, model, subType, models: null};
		if (model[Symbol.iterator])
		{
			out.models = out.model;
			out.model = null;
		}
		Object.assign(out, assertion.infos);
		return (out);
	};
	contract.assertions = {};
	contract.validate = (data, infos) =>
	{
		if (data === undefined)
			return (-1);
		Object.assign(infos, infos.assertion.infos);
		if (infos.precomputed !== undefined)
			infos.precomputed = infos.precomputed(data);
		if ((infos.models !== null) &&
		(infos.handleIterableModel !== false))
		{
			for (let model of infos.models)
			{
				infos.model = model;
				if (infos.assertion(data, infos) === true)
					return (1);
			}
			infos.model = null;
		}
		else if (infos.assertion(data, infos) === true)
			return (1);
		return (0);
	};
	contract.validateError = (data, infos, error) =>
	{
		let validation = null;
		let errOut = null;
		if ((validation = contract.validate(data, infos)) === 1)
			return ;
		else if (validation === -1)
			errOut = error || new TypeError('contract.validate@data: shall not be undefined!');
		else
			errOut = error || new TypeError('contract.validate@data: false assertion!');
		throw errOut;
	};
	contract.validateBool = (data, infos) => ((contract.validate(data, infos)) === 1) ? true : false;
	contract.addAssertion = (name, handler, infos) =>
	{
		if (isFreeze === true)
			throw new Error('contract.addAssertion: contract is freeze!');
		handler.infos = infos;
		contract.assertions[name] = handler;
	}
	contract.freeze = () =>
	{
		if (isFreeze === true)
			throw new Error('contract.freeze: is already freeze!');
		Object.freeze(contract.assertions);
		isFreeze = true;
	};
	Object.freeze(contract);
	return (contract);
})();
module.exports = contract;
require('./assertions/primitives.js');
require('./assertions/instance.js');
require('./assertions/iterator.js');