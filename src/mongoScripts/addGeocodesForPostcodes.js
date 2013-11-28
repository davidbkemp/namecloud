
db.suburbPopularName.find().forEach(function (suburbPopularName) {
    print(suburbPopularName.postcode);
    db.suburbs.find({postcode: suburbPopularName.postcode}).forEach(function (suburb) {
        suburbPopularName.geo = [
            suburb.centrePoint[0],
            suburb.centrePoint[1]
        ]
        db.suburbPopularName.save(suburbPopularName);
    });
});

db.suburbPopularName.ensureIndex({geo: '2d'});
