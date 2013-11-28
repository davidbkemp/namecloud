print(db.wpContent.count());

db.suburbNameCount.drop();
db.suburbPopularName.drop();

// Count number of instances of a name in a suburb
db.wpContent.mapReduce(
        function () {
            try {
                var postcode = this.entry.header.address.postcode;
                if (postcode) {
                    var subscriber = this.entry.header.name.subscriber;
                    var value = {
                        postcode: postcode,
                        name: subscriber,
                        cnt: 1
                    };
                    emit(postcode + '|' +  subscriber, value);
                }
            } catch (e) {
                print(e)
            }
        },
        function (key, values) {
            var resultCnt = 0;
            values.forEach(function (value) {
                resultCnt += value.cnt;
            });
            var firstValue = values[0];
            return {
                postcode: firstValue.postcode,
                name: firstValue.name,
                cnt: resultCnt
            };
        },
        {
            query: { 'entry.type' : 'R' },
            out: 'suburbNameCount'
        }
);

// Find the most common name in a suburb
db.suburbNameCount.mapReduce(
        function () {
            try {
                emit(this.value.postcode, this.value);
            } catch (e) {
                print(e);
            }
        },
        function (key, values) {
            var mostPopular = values[0];
            values.forEach(function (value) {
                if (value.cnt > mostPopular.cnt) mostPopular = value;
            });
            return {
                postcode: mostPopular.postcode,
                name: mostPopular.name,
                cnt: mostPopular.cnt
            };
        },
        {
            out: 'suburbPopularName'
        }
);

db.suburbPopularName.find().forEach(function (suburbPopularName) {
    db.suburbPopularName.save({
        _id: suburbPopularName._id,
        postcode: suburbPopularName.value.postcode,
        name: suburbPopularName.value.name,
        cnt: suburbPopularName.value.cnt
    });
});

//db.suburbPopularName.ensureIndex({'value.geo': '2d'});
