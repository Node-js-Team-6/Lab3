const { Repository } = require('./repository');
const { Mappers } = require('../mapper');

class RatingRepository {
    constructor(mongoClient, dbName, logger = null) {
        this.repo = new Repository(mongoClient, dbName, logger);
        this.map = Mappers.objToRating;
    }

    /*
     * adding item to the collection
     */
    create(item) {
        this.repo.create(item, "ratings");
    }

    /*
     * updates item in the collection; matching element happens by id
     */
    update(item) {
        this.repo.update(item, "ratings")
    }

    /*
     * deletes item from the collection; matching element happens by id
     */
    delete(item) {
        this.repo.delete(item, "ratings");
    }

    /*
     * finds one item from the collection; finding element happens by id
     */
    find(id, callback = function(result) {}) {
        this.repo.find(id, "ratings", (res) => {
            const rating = this.map(res);
            callback(rating);
        });
    }

    /*
     * finds matched items from the collection; several criterions are passed:
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
    findMany(filterObject = {}, sortObject = {}, callback = function (result) { }) {
        this.repo.findMany("ratings", filterObject, sortObject, (res) => {
            let ratings = new Array();

            for (let r of res) {
                ratings.push(this.map(r));
            }

            callback(ratings);
        });
    }

    loadRatings(ids = [], callback = function(result) {}) {
        this.findMany({ _id: { $in: ids} }, {}, (res) => callback(res));
    }
}

exports.RatingRepository = RatingRepository;