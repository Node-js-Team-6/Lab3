class Repository{
    constructor(mongoClient, dbName, logger = null) {
        this.client = mongoClient;
        this.dbName = dbName;
        this.logger = logger;
    }

    /*
     * adding item to the collection with specified name - collectionName
     * returns id of the inserted element; YOU'D BETTER SAVE THAT ID
     */
    async create(item, collectionName) {
        const res = await client.db(this.dbName).collection(collectionName).insertOne(item);

        if(this.logger) {
            this.logger.log(`New object created with the following id: ${res.insertedId}`);
        }

        return res;
    }

    /*
     * updates item in the collection with specified name; matching element happens by id
     */
    async update(item, collectionName) {
        const res = await client.db(this.dbName).collection(collectionName).updateOne({ _id: item.id }, { $set: item });

        if(this.logger) {
            this.logger.log(`${res.matchedCount} object(s) matched the query criteria.`);
            this.logger.log(`${res.modifiedCount} object(s) was/were updated.`);
        }
    }

    /*
     * deletes item from the collection with specified name; matching element happens by id
     */
    async delete(item, collectionName) {
        const res = await client.db(this.dbName).collection(collectionName).deleteOne({ _id: item.id });

        if(this.logger) {
            this.logger.log(`${res.deletedCount} object(s) was/were deleted.`);
        }
    }

    /*
     * finds one item from the collection with specified name; finding element happens by id
     * returns found object
     */
    async find(id, collectionName) {
        let res = await client.db(this.dbName).collection(collectionName).findOne({ _id: itemm.id });

        if(this.logger) {
            if (res) {
                this.logger.log(`Found an object in the collection with id: '${id}':`);
            } else {
                this.logger.log(`No objects found with id: '${id}'`);
            }
        }

        return res;
    }

    /*
     * finds matched items from the collection with specified name; several criterions are passed:
     *         - filterObject - object, which determines filtering criterions; passed object must meet mongodb filter criterions. 
     *                          consider looking at the following examples:
     *                          { name : "user3", surname : "option" } - name == "user3" and surname == "option"
     *                          { $or : [{ name : "user3" }, { surname : "option" }]} - name == "user3" or surname == "option"
     *                          { age : {$lt : 38}} - age < 38
     *                          { name : {$in : ["user1", "john", "user2"]} } - name one of the specified
     *                          { house : {$exists : 1} } - has field house
     *         - sortObject   - object, which determines sorting criterions; passed object must meet mongodb sort criterions. 
     *                          consider looking at the following examples:
     *                          { name : 1 } - sorted by name ascending; -1 - descending
     *                          { name : 1, surname : 1 } - sorted by name ascending, then by surname ascending
     * returns found objects
     */
    async find(collectionName, filterObject = {}, sortObject = {}) {
        const cursor = client.db(this.dbName).collection(collectionName).find(filterObject).sort(sortObject);
        let res = await cursor.toArray();

        if(this.logger) {
            if (res.length > 0) {
                this.logger.log(`Found ${res.length} object(s) in the collection':`);
            } else {
                this.logger.log(`No objects found`);
            }
        }

        return res;
    }
}

async function createExample() {
    const { MongoClient } = require("mongodb");

    // Connection URI
    const uri = "mongodb://localhost:27017";
    // Create a new MongoClient
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");

        const repo = new Repository(client, "fileManager", { log(msg) { console.log(msg) } });
        console.log("wwwwwwwww");
    }
    catch(e) {
        console.log("error");
        console.log(e);
    } 
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

createExample();