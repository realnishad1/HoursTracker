const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    
    // Safety check: If connection string is missing, return a clear error
    if (!connectionString) {
        context.res = { status: 500, body: "Missing AZURE_STORAGE_CONNECTION_STRING in Azure Configuration" };
        return;
    }

    const client = TableClient.fromConnectionString(connectionString, "TrackerData");

    try {
        // This line ensures the table exists before we try to use it
        await client.createTable(); 

        if (req.method === "POST") {
            const { type, payload } = req.body;
            await client.upsertEntity({
                partitionKey: "User_Default",
                rowKey: type,
                data: JSON.stringify(payload)
            });
            context.res = { status: 200, body: { message: "Sync successful" } };
        } 
        else {
            const entities = client.listEntities({
                queryOptions: { filter: "PartitionKey eq 'User_Default'" }
            });

            let result = { entries: null, settings: null };
            for await (const entity of entities) {
                result[entity.rowKey] = JSON.parse(entity.data);
            }
            context.res = { status: 200, body: result };
        }
    } catch (error) {
        context.log.error("Detailed Error:", error.message);
        context.res = { 
            status: 500, 
            body: `Internal Server Error: ${error.message}` 
        };
    }
};
