var azureStorage = require('azure-storage');

//func run .\SendLogs\ -c "{\"nodename\": \"node1\"}"

/*

    Call this function to create a container for the calling system.
    It returns a blob container URL with a SAS token that allows writing
    of log files.

*/

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let blobSvc = azureStorage.createBlobService()

    let nodeName = req.query.nodename || req.body.nodename;
    nodeName = nodeName.toLowerCase();

    blobSvc.createContainerIfNotExists(nodeName, (error, result, response) => {
        if(!error){
            context.log('Created container ' + nodeName);

            //The time window we allow nodes to write to the container
            var startDate = new Date();
            var expiryDate = new Date(startDate);
            expiryDate.setMinutes(startDate.getMinutes() + 1000);
            startDate.setMinutes(startDate.getMinutes() - 100);

            let sharedAccessPolicy = {
                AccessPolicy: {
                    Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.WRITE +
                        azureStorage.BlobUtilities.SharedAccessPermissions.LIST +
                        azureStorage.BlobUtilities.SharedAccessPermissions.READ,
                    Start: startDate,
                    Expiry: expiryDate
                }
            }

            var blobSAS = blobSvc.generateSharedAccessSignature(nodeName, null , sharedAccessPolicy);
            var fullUrl = `https://${process.env['AZURE_STORAGE_ACCOUNT']}.blob.core.windows.net/${nodeName}?${blobSAS}`

            res = {
                body: fullUrl
            };

            context.done(null, res);
        }
    });
};