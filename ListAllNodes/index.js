var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

//http://localhost:7071/api/RegisterNewNode?nodename=node2&currentversion=1.0
//func run .\ListAllNodes\

module.exports = function (context, req) {
    MongoClient.connect(process.env.dbUrl, function(err, db) {
        assert.equal(null, err);
        context.log("Connected successfully to server");

        var collection = db.collection('nodes');
    
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(`Found ${docs.length} records`);
            
            db.close();

            res = {
                    body: JSON.stringify(docs)
            };
                
            context.done(null, res);
        });
    });
};