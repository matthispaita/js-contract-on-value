'use strict';
const contract = require('./index.js');

const	a = 15,
			b = true,
			c = 'un',
			d = [a, b, c],
			e = [a],
			f = [b],
			g = [c];
const ct =
[
	contract('primitive', Number),
	contract('primitive', Boolean),
	contract('primitive', String),
	contract('iterator', [Number, Boolean, String], 'primitive'),
	contract('iterator', Number, 'primitive'),
	contract('iterator', Boolean, 'primitive'),
	contract('iterator', String, 'primitive'),
	contract('instance', Array)
];
const tests =
{
	success:
	[
		[a, [ct[0]]],
		[b, [ct[1]]],
		[c, [ct[2]]],
		[d, [ct[3]]],
		[e, [ct[3], ct[4], ct[7]]],
		[f, [ct[3], ct[5], ct[7]]],
		[g, [ct[3], ct[6], ct[7]]]
	],
	fail:
	[
		[a, [ct[1], ct[2], ct[3], ct[4], ct[5], ct[6], ct[7]]],
		[b, [ct[0], ct[2], ct[3], ct[4], ct[5], ct[6], ct[7]]],
		[c, [ct[0], ct[1], ct[4], ct[5], ct[7]]],
		[d, [ct[0], ct[1], ct[2], ct[4], ct[5], ct[6]]],
		[e, [ct[0], ct[1], ct[2], ct[5], ct[6]]],
		[f, [ct[0], ct[1], ct[2], ct[6]]],
		[g, [ct[0], ct[1], ct[2], ct[5]]]
	]
};
const test = (sTest, expected) =>
{
	let ok = 0;
	let ko = 0;
	for (let test of tests[sTest])
	{
		const data = test[0];
		const _cts = test[1];
		for (let _ct of _cts)
			if (contract.validateBool(data, _ct) !== expected)
			{
				console.warn(`Test failled at tests.${sTest} with data: ${data}: `, _ct);
				ko += 1;	
			}
			else
			 ok += 1;
	}
	console.log(`${ok}/${ok + ko} passed at ${sTest}`);
};
test('success', true);
test('fail', false);