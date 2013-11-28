exports.list = function(req, res) {
    var body = JSON.stringify({test: 'abc', foo: 'he hhe he'});
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.end(body);
};