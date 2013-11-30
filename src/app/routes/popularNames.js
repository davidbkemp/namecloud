/*global exports, require, console */


(function () {
    "use strict";

    var Q = require('q');
    var MongoClient = require('mongodb').MongoClient;
    var db;

    var createBoundingBox = function (req) {
        var lon1 = parseFloat(req.query.lon1, 10), lat1 = parseFloat(req.query.lat1, 10), lon2 = parseFloat(req.query.lon2, 10), lat2 = parseFloat(req.query.lat2, 10);

        var box = [
            [lon1,  lat1],
            [lon2, lat2]
        ];

        console.log('bounding box: ', box);
        return box;
    };

//    var popularNamesPerState = function(req, res) {
//        console.log('popularNamesPerState');
//        var body = JSON.stringify([
//            {name: 'Smith', geo: {lat: -36.64, lon: 144.11}},
//            {name: 'Smith', geo: {lat: -31.0, lon: 146.4}},
//            {name: 'Smith', geo: {lat: -24.9, lon: 145.0}},
//            {name: 'Smith', geo: {lat: -14.5, lon: 131.7}},
//            {name: 'Smith', geo: {lat: -27.9, lon: 134.3}},
//            {name: 'Smith', geo: {lat: -42.39, lon: 146.73}},
//            {name: 'Smith', geo: {lat: -28.1, lon: 119.3}}
//        ]);
//        res.setHeader('Content-Type', 'application/json');
//        res.setHeader('Content-Length', body.length);
//        res.end(body);
//
//    };

    var popularNamesPerBook = function(req, res) {
        console.log('popularNamesPerBook');
        var body = JSON.stringify([
            {name: 'Smith', geo: {lat: -31.9545, lon: 115.9810}},
            {name: 'Smith', geo: {lat: -21.4750, lon: 121.0000}},
            {name: 'Smith', geo: {lat: -29.3050, lon: 122.0650}},
            {name: 'Smith', geo: {lat: -33.5950, lon: 118.0150}},
            {name: 'Smith', geo: {lat: -37.8155, lon: 144.9315}},
            {name: 'Smith', geo: {lat: -37.7400, lon: 148.0550}},
            {name: 'Smith', geo: {lat: -38.2935, lon: 143.9000}},
            {name: 'Smith', geo: {lat: -36.5800, lon: 142.7550}},
            {name: 'Smith', geo: {lat: -37.7900, lon: 142.2150}},
            {name: 'Smith', geo: {lat: -38.4230, lon: 145.9535}},
            {name: 'Smith', geo: {lat: -37.9710, lon: 145.4280}},
            {name: 'Smith', geo: {lat: -36.5500, lon: 143.6700}},
            {name: 'Smith', geo: {lat: -36.7800, lon: 146.0650}},
            {name: 'Smith', geo: {lat: -35.6100, lon: 145.0750}},
            {name: 'Smith', geo: {lat: -34.1100, lon: 143.1050}},
            {name: 'Smith', geo: {lat: -19.5500, lon: 132.6500}},
            {name: 'Smith', geo: {lat: -42.7800, lon: 147.0400}},
            {name: 'Smith', geo: {lat: -40.9500, lon: 147.2800}},
            {name: 'Smith', geo: {lat: -41.4700, lon: 145.1700}},
            {name: 'Smith', geo: {lat: -34.9600, lon: 138.6935}},
            {name: 'Smith', geo: {lat: -34.6100, lon: 138.6850}},
            {name: 'Smith', geo: {lat: -30.5750, lon: 135.0050}},
            {name: 'Smith', geo: {lat: -36.9200, lon: 140.1650}},
            {name: 'Smith', geo: {lat: -33.7450, lon: 138.8750}},
            {name: 'Smith', geo: {lat: -27.3695, lon: 153.0550}},
            {name: 'Smith', geo: {lat: -14.8650, lon: 143.8000}},
            {name: 'Smith', geo: {lat: -22.6200, lon: 145.8750}},
            {name: 'Smith', geo: {lat: -25.6200, lon: 151.2650}},
            {name: 'Smith', geo: {lat: -28.0750, lon: 149.8150}},
            {name: 'Smith', geo: {lat: -28.0115, lon: 153.3450}},
            {name: 'Smith', geo: {lat: -21.2850, lon: 143.2750}},
            {name: 'Smith', geo: {lat: -27.6225, lon: 153.0095}},
            {name: 'Smith', geo: {lat: -27.2850, lon: 145.5150}},
            {name: 'Smith', geo: {lat: -25.8985, lon: 152.5065}},
            {name: 'Smith', geo: {lat: -35.1625, lon: 148.9870}},
            {name: 'Smith', geo: {lat: -33.9428, lon: 150.9485}},
            {name: 'Smith', geo: {lat: -30.0700, lon: 150.3050}},
            {name: 'Smith', geo: {lat: -33.8000, lon: 146.1950}},
            {name: 'Smith', geo: {lat: -32.5060, lon: 151.8000}},
            {name: 'Smith', geo: {lat: -31.3450, lon: 145.8750}},
            {name: 'Smith', geo: {lat: -29.4710, lon: 152.9430}},
            {name: 'Smith', geo: {lat: -34.4880, lon: 150.7805}},
            {name: 'Smith', geo: {lat: -33.3190, lon: 151.3060}},
            {name: 'Smith', geo: {lat: -30.8250, lon: 152.5600}},
            {name: 'Smith', geo: {lat: -32.3200, lon: 150.7895}},
            {name: 'Smith', geo: {lat: -33.2150, lon: 149.3150}},
            {name: 'Smith', geo: {lat: -33.7515, lon: 150.4045}},
            {name: 'Smith', geo: {lat: -34.9000, lon: 149.8350}},
            {name: 'Smith', geo: {lat: -35.5005, lon: 150.0850}},
            {name: 'Smith', geo: {lat: -33.4735, lon: 150.7330}},
            {name: 'Smith', geo: {lat: -34.1875, lon: 150.6590}},
            {name: 'Smith', geo: {lat: -36.9070, lon: 149.6915}},
            {name: 'Smith', geo: {lat: -31.3450, lon: 141.4400}},
            {name: 'Smith', geo: {lat: -36.0275, lon: 146.9585}},
            {name: 'Smith', geo: {lat: -36.5875, lon: 148.8115}}
        ]);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    };

    var processDocs = function(res, docs) {
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


    var popularNamesPerSuburb = function(req, res, matchingSuburbsCursor) {

        console.log('popularNamesPerSuburb');

        var deferred = Q.defer();
        matchingSuburbsCursor.toArray(function (err, docs) {
            if (err) {
                deferred.reject(err);
            } else {
                processDocs(res, docs);
                deferred.resolve();
            }
        });

        return  deferred.promise;
    };

    var countMatchingSuburbs = function (matchingSuburbsCursor) {

        var deferred = Q.defer();
        matchingSuburbsCursor.count(function (err, count) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("Found: " + count);
                deferred.resolve(parseInt(count, 10));
            }
        });

        return deferred.promise;
    };

    exports.init = function () {
        var deferred = Q.defer();
        MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, database) {
            if (err) throw err;
            db = database;
            deferred.resolve();
        });
        return deferred.promise;

    };

    exports.list = function(req, res) {
        console.log(req.query);

        var matchingSuburbsCursor = db.collection('suburbPopularName').find({geo: {'$geoWithin': {'$box': createBoundingBox(req)}}});

        countMatchingSuburbs(matchingSuburbsCursor)
            .then(function handleMatchingSuburbsCount(count) {
                if (count > 200) {
                    popularNamesPerBook(req, res);
                }
                else {
                    return popularNamesPerSuburb(req, res, matchingSuburbsCursor);
                }
            }).then(function () {
                matchingSuburbsCursor.close();
            })
            .fail(function (err) {
                console.log(err);
                res.send(500, 'Sorry, something has gone wrong!');
            });
    };

})();
