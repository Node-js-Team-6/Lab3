const { File } = require('./Model/file');
const { User } = require('./Model/user');
const { Rating } = require('./Model/rating');

function objToFile(obj) {
    let file = new File(obj._id, obj.name, obj.idUser, obj.size)
    file.downloadCount = obj.downloadCount;
    file.ratingsId = obj.ratingsId;
    return file;
}

function objToUser(obj) {
    let user = new User(obj._id, obj.name);
    return user;
}

function objToRating(obj) {
    let rating = new Rating(obj._id, obj.idUser, obj.idFile, obj.stars, obj.comment);
    return rating;
}

exports.Mappers = { 
    objToFile,
    objToRating,
    objToUser
};