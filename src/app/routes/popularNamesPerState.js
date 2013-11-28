/*global exports */

(function () {
    "use strict";

    var popularNamesPerState = function(req, res) {
        var body = JSON.stringify([
            {name: 'Smith', geo: {lat: -36.64, lon: 144.11}},
            {name: 'Smith', geo: {lat: -31.0, lon: 146.4}},
            {name: 'Smith', geo: {lat: -24.9, lon: 145.0}},
            {name: 'Smith', geo: {lat: -14.5, lon: 131.7}},
            {name: 'Smith', geo: {lat: -27.9, lon: 134.3}},
            {name: 'Smith', geo: {lat: -42.39, lon: 146.73}},
            {name: 'Smith', geo: {lat: -28.1, lon: 119.3}}
        ]);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    };

    exports.list = function(req, res) {
        popularNamesPerState(req, res);
    };
})();

