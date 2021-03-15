class Rating{
    constructor(id, idUser, idFile, stars, comment) {
        this._id = id;
        this.idUser = idUser;
        this.idFile = idFile;
        this.stars = stars;
        this.comment = comment;
    }
}

exports.Rating = Rating;