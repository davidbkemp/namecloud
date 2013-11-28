/*global exports, require, console */


(function () {
    "use strict";

    var Q = require('q');
    var MongoClient = require('mongodb').MongoClient;

    var createBoundingBox = function (req) {
        var lon1 = parseFloat(req.query.lon1, 10), lat1 = parseFloat(req.query.lat1, 10), lon2 = parseFloat(req.query.lon2, 10), lat2 = parseFloat(req.query.lat2, 10);

        var box = [
            [lon1,  lat1],
            [lon2, lat2]
        ];
        return box;
    };

    var popularNamesPerState = function(req, res) {
        console.log('popularNamesPerState');
        var body = JSON.stringify([
            {name: 'Smith', geo: {lat: -36.64, lon: 144.11}},
            {name: 'Smith', geo: {lat: -31.0, lon: 146.4}},
            {name: 'Smith', geo: {lat: -24.9, lon: 145.0}},
            {name: 'Smith', geo: {lat: -14.5, lon: 131.7}},
            {name: 'Smith', geo: {lat: -27.9, lon: 134.3}},
            {name: 'Smith', geo: {lat: -42.39, lon: 146.73}},
            {name: 'Smith', geo: {lat: -28.1, lon: 119.3}}
        ]);
        console.log('Returning states: ' + body);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);

    };

    var processDocs = function(res, err, docs) {
        if (err) throw err;

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

        console.log('popularNamesPerSuburb');

        var box = createBoundingBox(req);

        MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
            if (err) throw err;

            db.collection('suburbPopularName')
                .find({geo: {'$geoWithin': {'$box': box}}})
                .toArray(function (err, docs) {
                    if (err) throw err;
                    console.log('Found: ' + docs);
                    db.close();
                    processDocs(res, err, docs);
                });


        });


    };

    var countMatchingSuburbs = function (req) {
        var box = createBoundingBox(req);

        var deferred = Q.defer();

        MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
            if (err) throw err;

            db.collection('suburbPopularName')
                .find({geo: {'$geoWithin': {'$box': box}}})
                .count(function (err, count) {
                    if (err) throw err;
                    console.log("Found: " + count);
                    db.close();
                    deferred.resolve(parseInt(count, 10));
                });
        });

        return deferred.promise;
    };

    exports.list = function(req, res) {
        console.log(req.query);

        countMatchingSuburbs(req)
            .then(function handleMatchingSuburbsCount(count) {
                console.log('Yes, really found: ' + count);
                if (count > 100) {
                    popularNamesPerState(req, res);
                } else {
                    popularNamesPerSuburb(req, res);
                }
            });
    };

})();
