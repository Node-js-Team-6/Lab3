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

    render() {
        let $btn = $('<button/>', {
            class: 'btn',
            text: this.name,
            id: this.id
        });
        // $btn.on('click', function (){
        //     currentFolder = this;
        //     render_body();
        // });
    }
}