var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

//http://localhost:7071/api/CheckForUpdate?nodename=node1
//func run .\CheckForUpdate\ -c "{\"nodename\": \"node1\"}"

module.exports = function (context, req) {
    context.log('Endpoint: ' + process.env.dbUrl);
    
    let nodeName = req.query.nodename || req.body.nodename;

    if(!nodeName) {
        res = {
            status: 400,
            body: 'Missing parameter: nodename'
        };
                
        context.done(null, res);
    }

    MongoClient.connect(process.env.dbUrl, function(err, db) {
        assert.equal(null, err);
        context.log("Connected successfully to server");

        var collection = db.collection('nodes');

        collection.findOne({ 'NodeName': nodeName }, (err, doc) => {
            assert.equal(err, null);

            db.close();

            let targetVersion = doc.TargetVersion || doc.CurrentVersion;

            res = {
                body: targetVersion
            };
                
            context.done(null, res);
        });
    });
};