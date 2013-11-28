(function () {

    var MongoClient = require('mongodb').MongoClient;


    var popularNamesPerSuburb = function(req, res) {

        console.log(req.query);

        var lon1 = parseFloat(req.query.lon1, 10),
            lat1 = parseFloat(req.query.lat1, 10),
            lon2 = parseFloat(req.query.lon2, 10),
            lat2 = parseFloat(req.query.lat2, 10)

        var box = [ [lon1,  lat1], [lon2, lat2] ];

        MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
            if (err) throw err;

            console.log(box);
            var collection = db
                .collection('suburbPopularName')
                .find({geo: {'$geoWithin': {'$box': box}}})
                .toArray(function(err, docs) {
                    if (err) throw err;
                    console.dir(docs);
                    var body = JSON.stringify(docs);
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Content-Length', body.length);
                    res.end(body);
                });


        });


    }
    exports.list = function(req, res) {
        popularNamesPerSuburb(req, res);
    };

})();
