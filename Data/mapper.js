const { File } = require('./Model/file');
const { User } = require('./Model/user');
const { Rating } = require('./Model/rating');

function objToFile(obj = null) {
    if(obj === null) return null;
    let file = new File(obj.name, obj.idUser, obj.size)
    file._id = obj._id;
    file.downloadCount = obj.downloadCount;
    file.ratingsId = obj.ratingsId;
    file.rating = obj.rating;
    return file;
}

function objToUser(obj = null) {
    if(obj === null) return null;
    let user = new User(obj.name);
    user._id = obj._id;
    return user;
}

function objToRating(obj = null) {
    if(obj === null) return null;
    let rating = new Rating(obj.idUser, obj.idFile, obj.stars, obj.comment);
    rating._id = obj._id;
    return rating;
}

exports.Mappers = { 
    objToFile,
    objToRating,
    objToUser
};