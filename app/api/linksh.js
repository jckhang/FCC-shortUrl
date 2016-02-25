'use strict';
module.exports = function(app, db) {

    app.get('/:name', function(req, res) {
        var name = req.params.name;
        console.log(name);
        if (name != 'favicon.ico') {
            findURL(name, db, res);
        }
    })


    app.get('/api/linksh', function(req, res) {
        var name = req.query.name;
        var url = req.query.url;
        var urlObj = {};
        urlObj = {
            "original_url": url,
            "name": name
        };
        console.log(name);
        console.log(url);
        res.send(urlObj);
        save(urlObj, db);
    });



    function save(obj, db) {
        // Save object into db.
        var sites = db.collection('sites');
        sites.save(obj, function(err, result) {
            if (err) throw err;
            console.log('Saved ' + result);
        });
    }

    function findURL(name, db, res) {
        // Check to see if the site is already there
        var sites = db.collection('sites');
        console.log(name);
        // get the url
        sites.findOne({
            "name": name
        }, function(err, result) {
            if (err) throw err;
            console.log(result);
            // object of the url
            if (result) {
                // we have a result
                console.log('Found ' + result);
                console.log('Redirecting to: ' + result.original_url);
                res.redirect("https://"+result.original_url);
            } else {
                // we don't
                res.send('Site not found');
            }
        });
    }

};
