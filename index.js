'use strict';
const contract = (() =>
{
	const primitives = {};
	primitives[Boolean] = 'boolean';
	primitives[String] = 'string';
	primitives[Number] = 'number';
	primitives[Object] = 'object';
	Object.freeze(primitives);
	const contract = (type, model, subType) =>
	{
		const hdl = contract.assertions[type];
		if (hdl === undefined)
			throw new TypeError('contract@type: shall be a reference to a method of contract.assertions');
		const out = {type, model, subType};
		Object.assign(out, hdl.infos);
		return (out);
	};
	contract.assertions =
	{
		primitive: (data, {model}) =>
		(
				((typeof data === primitives[model]) ||
				(data instanceof model)) ?
				true : false
		),
		instance: (data, {model}) => data instanceof model,
		iterator:	(data, {model, subType}) =>
		{
			const hdl = contract.assertions[subType];
			if (data[Symbol.iterator] === undefined)
				return (false);
			for (let entry of data)
				if (contract.validateBool(entry, {model, type: subType}) === false)
					return (false);
			return (true);
		}
	};
	contract.assertions.iterator.infos = {handleIterableModel: false};
	contract.validate = (data, infos = {}, error) =>
	{
		let errOut = null;
		if (data === undefined)
			errOut = error || new TypeError('contract.validate@data: shall not be undefined!');
		else
		{
			const hdl = contract.assertions[infos.type];
			if ((infos.model[Symbol.iterator] !== undefined) &&
			(infos.handleIterableModel !== false))
			{
				for (let model of infos.model)
					if (hdl(data, {model, type: infos.type, subType: infos.subType}) === true)
						return;
			}
			else if (hdl(data, infos) === true)
				return;
		}
		throw error || errOut || new TypeError('contract.validate@data: false assertion!');
	};
	contract.validateBool = (data, infos) =>
	{
		try
		{
			contract.validate(data, infos, 1);
			return (true);
		}
		catch (unusedError)
		{
			return (false);
		}
	}
	Object.freeze(contract);
	return (contract);
})();
module.exports = contract;