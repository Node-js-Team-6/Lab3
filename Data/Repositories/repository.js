class Repository{
    constructor(mongoClient, dbName, logger = null) {
        this.client = mongoClient;
        this.dbName = dbName;
        this.logger = logger;
    }

    /*
     * adding item to the collection with specified name - collectionName
     */
    create(item, collectionName) {
        const res = this.client.db(this.dbName).collection(collectionName).insertOne(item);

        if(this.logger) {
            this.logger.log(`New object created`);
        }

    }

    /*
     * updates item in the collection with specified name; matching element happens by id
     */
    update(item, collectionName) {
        const res = this.client.db(this.dbName).collection(collectionName).updateOne({ _id: item._id }, { $set: item });

        if(this.logger) {
            this.logger.log(`${res.matchedCount} object(s) matched the query criteria.`);
            this.logger.log(`${res.modifiedCount} object(s) was/were updated.`);
        }
    }

    /*
     * deletes item from the collection with specified name; matching element happens by id
     */
    delete(id, collectionName) {
        const res = this.client.db(this.dbName).collection(collectionName).deleteOne({ _id: id });

        if(this.logger) {
            this.logger.log(`${res.deletedCount} object(s) was/were deleted.`);
        }
    }

    /*
     * finds one item from the collection with specified name; finding element happens by id
     */
    find(id, collectionName, callback = function(result) {}) {
        
        this.client.db(this.dbName).collection(collectionName).findOne({ _id: id }, (err, result) => {
            if(err) {
                this.logger.log(`Error while finding element with id '${id}'`);
                return;
            }
            
            if(this.logger) {
                if (result) {
                    this.logger.log(`Found an object in the collection with id: '${id}':`);
                } else {
                    this.logger.log(`No objects found with id: '${id}'`);
                }
            }
    
            callback(result);
        });
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
     */
    findMany(collectionName, filterObject = {}, sortObject = {}, callback = function(result) {}) {
        this.client.db(this.dbName).collection(collectionName).find(filterObject).sort(sortObject).toArray((err, result) => {
            if(err) {
                this.logger.log(`Error while finding element with id '${id}'`);
                return;
            }

            if(this.logger) {
                if (result.length > 0) {
                    this.logger.log(`Found ${result.length} object(s) in the collection':`);
                } else {
                    this.logger.log(`No objects found`);
                }
            }
    
            callback(result);
        });
    }
}

exports.Repository = Repository;