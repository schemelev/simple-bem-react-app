'use strict';

import 'reflect-metadata';

if (typeof Promise === 'undefined') {
    require('promise/lib/rejection-tracking').enable();
    window.Promise = require('promise/lib/es6-extensions.js');
}

if (typeof Map === 'undefined') {
    require('es6-map/implement');
}

require('whatwg-fetch');

Object.assign = require('object-assign');
