
db.suburbPopularName.find().forEach(function (suburbPopularName) {
    print(suburbPopularName.postcode);
    db.suburbs.find({postcode: suburbPopularName.postcode}).forEach(function (suburb) {
        suburbPopularName.geo = {
            lon: suburb.centrePoint[0],
            lat: suburb.centrePoint[1]
        };
        db.suburbPopularName.save(suburbPopularName);
    });
});

db.suburbPopularName.ensureIndex({geo: '2d'});
