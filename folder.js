class Folder{
    constructor(id, name, idUser, size){
        this.parent = null;
        this.id = id;
        this.name = name;
        this.idUser = idUser;
        this.size = size;
        this.downloadCount = 0;
        this.childs = []
    }
}