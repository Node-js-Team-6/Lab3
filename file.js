class File{
    constructor(id, name, idUser, size){
        this.parent = null;
        this.id = id;
        this.name = name;
        this.extension = name.split(".")[1];
        this.idUser = idUser;
        this.size = size;
        this.downloadCount = 0;
    }
}