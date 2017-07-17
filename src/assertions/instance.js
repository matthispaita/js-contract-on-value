'use strict';
const contract = require('../index.js');
contract.addAssertion("instance", (data, {model}) => data instanceof model);