(function () {


    var popularNamesPerState = function(req, res) {
        var body = JSON.stringify([
            {name: 'Smith', geo: {lat: -37.716, lon: 144.891}},
            {name: 'Jones', geo: {lat: -41.218, lon: 1446.188}},
            {name: 'Nyuan', geo: {lat: -25.173, lon: 144.891}},
            {name: 'Potter', geo: {lat: -33.390, lon: 149.547}},
            {name: 'Brown', geo: {lat: -28.101, lon: 115.192}}
        ]);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    }

    exports.list = function(req, res) {
        popularNamesPerState(req, res);
    };
})();

