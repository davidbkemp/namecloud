/*global exports, require, console */

(function () {
    "use strict";

    var MongoClient = require('mongodb').MongoClient;

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
        popularNamesPerSuburb(req, res);
    };

})();
