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

    render() {
        let $div_row = $('<div/>', {
            class: 'row',
            id: this.id
        });
        let $div_icon = $('<div/>', {
            class: 'col'
        });
        let $div_text = $('<div/>', {
            class: 'col',
            html: this.name + '.' + this.extension
        });
        let $img = $('<img/>', {
            src: '../Resources/'+this.extension+'.ico'
        });
        $div_icon.append($img);
        $div_row.append($div_icon);
        $div_row.append($div_text);
        return $div_row;
    }
}