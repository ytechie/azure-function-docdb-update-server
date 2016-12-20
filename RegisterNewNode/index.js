var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

//Example paramters: nodename=node1&currentversion=1.0
//func run .\RegisterNewNode\ -c "{\"nodename\": \"node1\",\"currentversion\": \"1.0\"}"

module.exports = function (context, req) {
    //context.log('Endpoint: ' + process.env.dbUrl);

    let newNode = {
        LastSeen: new Date(),
        NodeName: req.query.nodename || req.body.nodename,
        CurrentVersion: req.query.currentversion || req.body.currentversion
    };

    if(!newNode.NodeName || !newNode.CurrentVersion) {
        res = {
            status: 400,
            body: 'Paramters required: nodename, currentversion'
        };
        context.done(null, res);
        return;
    }

    MongoClient.connect(process.env.dbUrl, function(err, db) {
        assert.equal(null, err);
        context.log("Connected successfully to server");

        var collection = db.collection('nodes');
    
        collection.insertOne(newNode, (err, r) => {
            if(err) {
                res = {
                    status: 500,
                    body: `Error: ${JSON.stringify(err)}`
                };
            } else {
                res = {
                    body: `Inserted ${JSON.stringify(newNode)}`
                };
            }

            db.close();
            context.done(null, res);
        });
    });
};