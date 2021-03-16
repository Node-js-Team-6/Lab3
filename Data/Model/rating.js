class Rating{
    constructor(idUser, idFile, stars, comment) {
        this._id = undefined;
        this.idUser = idUser;
        this.idFile = idFile;
        this.stars = stars;
        this.comment = comment;
    }
}

exports.Rating = Rating;