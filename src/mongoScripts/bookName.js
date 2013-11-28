
db.bookNameCount.drop();
db.bookPopularName.drop();

// Count number of instances of a name in a book
db.wpContent.mapReduce(
        function () {
            try {
                var book = this.entry.book.id;
                if (book) {
                    var subscriber = this.entry.header.name.subscriber;
                    var value = {
                        book: book,
                        name: subscriber,
                        cnt: 1
                    };
                    emit(book + '|' +  subscriber, value);
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
                book: firstValue.book,
                name: firstValue.name,
                cnt: resultCnt
            };
        },
        {
            query: { 'entry.type' : 'R' },
            out: 'bookNameCount'
        }
);

// Find the most common name in a book
db.bookNameCount.mapReduce(
        function () {
            try {
                emit(this.value.book, this.value);
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
                book: mostPopular.book,
                name: mostPopular.name,
                cnt: mostPopular.cnt
            };
        },
        {
            out: 'bookPopularName'
        }
);

db.bookPopularName.find().forEach(function (bookPopularName) {
    db.bookPopularName.save({
        _id: bookPopularName._id,
        book: bookPopularName.value.book,
        name: bookPopularName.value.name,
        cnt: bookPopularName.value.cnt
    });
});

//db.bookPopularName.ensureIndex({'value.geo': '2d'});
