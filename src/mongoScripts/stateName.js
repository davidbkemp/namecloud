print(db.wpContent.count());

db.stateNameCount.drop();
db.statePopularName.drop();

// Count number of instances of a name in a state
db.wpContent.mapReduce(
        function () {
            try {
                var value = {
                    state: this.entry.header.address.state,
                    name: this.entry.header.name.subscriber,
                    cnt: 1
                };
                emit(this.entry.header.address.state + '|' +  this.entry.header.name.subscriber, value);
                emit(this.entry.header.address.state + '|' +  this.entry.header.name.subscriber, value);
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
                state: firstValue.state,
                name: firstValue.name,
                cnt: resultCnt
            };
        },
        {
            query: { 'entry.type' : 'R' },
            out: 'stateNameCount'
        }
);

// Find the most common name in a state
db.stateNameCount.mapReduce(
        function () {
            try {
                emit(this.value.state, this.value);
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
                state: mostPopular.state,
                name: mostPopular.name,
                cnt: mostPopular.cnt
            };
        },
        {
            out: 'statePopularName'
        }
);
