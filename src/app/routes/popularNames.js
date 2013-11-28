/*global exports, require, console */

(function () {
    "use strict";

    var MongoClient = require('mongodb').MongoClient;

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
    };

    var processDocs = function(res, err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        console.dir(docs);
        var transformedDocs = docs.map(function (doc) {
            return {
                name: doc.name,
                geo: {
                    lat: doc.geo[1], lon: doc.geo[0]
                },
                cnt: doc.cnt
            };
        });
        var body = JSON.stringify(transformedDocs);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    };


    var popularNamesPerSuburb = function(req, res) {

        console.log(req.query);

        var lon1 = parseFloat(req.query.lon1, 10), lat1 = parseFloat(req.query.lat1, 10), lon2 = parseFloat(req.query.lon2, 10), lat2 = parseFloat(req.query.lat2, 10);

        var box = [
            [lon1,  lat1],
            [lon2, lat2]
        ];

        MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(box);

            db.collection('suburbPopularName')
                .find({geo: {'$geoWithin': {'$box': box}}})
                .toArray(function (err, docs) {
                    processDocs(res, err, docs);
                });


        });


    };

    exports.list = function(req, res) {
        if (req.query.level === 'state') {
            popularNamesPerState(req, res);
        } else {
            popularNamesPerSuburb(req, res);
        }
    };

})();
