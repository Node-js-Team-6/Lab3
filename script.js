class File{
    constructor(id, name, extension, size, downloadCount, rating, user){
        this._id = id;
        this.name = name;
        this.extension = extension;
        this.user = user;
        this.size = size;
        this.downloadCount = downloadCount;
        this.rating = rating;
    }



    render() {
        let $div_row = $('<div/>', {
            class: 'row p-1 border-bottom border-danger',
            style: 'border-width: 3px !important;'
        });
        let $div_icon = $('<div/>', {
            class: 'col-1'
        });
        let $div_text = $('<div/>', {
            class: 'col-4',
            html: this.name + '.' + this.extension
        });
        let $div_rating = $('<div/>', {
            class: 'col-2  text-center',
            html: this.rating + '/5'
        });
        let $div_author = $('<div/>', {
            class: 'col-2 text-center',
            html: this.user.name
        });
        let img_path;
        if (['png', 'txt', 'mp4'].includes(this.extension))
            img_path = this.extension;
        else
            img_path = 'undefined'
        let $img = $('<img/>', {
            src: 'Resources/'+img_path+'.ico',
            width: 20,
            height: 20,
        });
        let $div_btn = $('<div/>', {
            class: 'col-2',
        });

        let $div_count = $('<div/>', {
            class: 'col-1',
            html: this.downloadCount
        });
        let $btn = $('<btn/>', {
            class : 'btn btn-danger',
            text: 'Download'
        })
        let file = this;
        $btn.on('click', function ()
        {
            let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
            currentFolder.children.find(f => f._id === file._id).downloadCount++;
            window.localStorage.setItem('currentFolder', JSON.stringify(currentFolder));
            bodyRender();
        });
        $div_btn.append($btn);
        $div_icon.append($img);

        $div_row.append($div_icon);
        $div_row.append($div_text);
        $div_row.append($div_author);
        $div_row.append($div_rating);
        $div_row.append($div_btn);
        $div_row.append($div_count);
        return $div_row;
    }
    static from (data)
    {
        return new File(data._id, data.name, data.extension, data.size, data.downloadCount, data.rating, data.user);
    }

}

class Folder{
    constructor(id, name, idUser){
        this.parent = null;
        this._id = id;
        this.name = name;
        this.idUser = idUser;
        this.user = new User(-1, 'Unknown');
        this.downloadCount = 0;
        this.children = []
    }

    addChild(child)
    {
        this.children.push(child);
        //child.parent = this;
    }

// render() {
//     let $div_row = $('<div/>', {
//         class: 'row p-1 border-bottom border-danger',
//         style: 'border-width: 3px !important;'
//     });
//     let $div_author = $('<div/>', {
//         class: 'col-2 text-center',
//         html: this.user.name
//     });
//     let $div_rating = $('<div/>', {
//         class: 'col-2',
//         html: ''
//     });
//     let $div_link = $('<a/>', {
//         class: 'col-5',
//         html: this.name,
//         href: '',
//         style: 'color: #d9534f'
//     });
//     let $div_icon = $('<div/>', {
//         class: 'col-1'
//     });
//     let $img = $('<img/>', {
//         src: 'Resources/folder.ico',
//         width: 20,
//         height: 20,
//     });
//     let folder = this;
//     $div_icon.append($img);
//     $div_link.on('click', function (){
//         window.localStorage.setItem('currentFolder', JSON.stringify(folder));
//         bodyRender();
//     });
//     $div_row.append($div_icon);
//     $div_row.append($div_link);
//     $div_row.append($div_author);
//     $div_row.append($div_rating);
//     return $div_row;
// }
    static from(data) {
        let f = new Folder(data._id, data.name, data.idUser);
        data.children.forEach( function (c){
            if (c.hasOwnProperty('children'))
            {
                f.addChild(Folder.from(c))
            }
            else
            {
                f.addChild(File.from(c));
            }
        })
        return f;
    }
}
class User{
    constructor(id, name){
        this._id = id;
        this.name = name;
    }
}
class Rating{
    constructor(id, idUser, idFile) {
        this._id = id;
        this.idUser = idUser;
        this.idFile = idFile;
    }
}

function search(){

}

function addFile(){

}

function deleteFile(){

}

function bodyRender()
{
    let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
    $('#container_folder').empty();
    currentFolder.children.forEach( function (c) {
        let idk = c.render();
        $('#container_folder').append(c.render());
    });
}

function sortByDownloadCount()
{
    let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
    currentFolder.children.sort((a, b) => b.downloadCount - a.downloadCount);
    window.localStorage.setItem('currentFolder', JSON.stringify(currentFolder));
    bodyRender();
}

function sortByRating()
{
    let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
    currentFolder.children.sort((a, b) => b.rating - a.rating);
    window.localStorage.setItem('currentFolder', JSON.stringify(currentFolder));
    bodyRender();
}

function sortByAuthor()
{
    let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
    currentFolder.children.sort(function (a, b) {
        if (a.user.name > b.user.name) return 1;
        if (a.user.name < b.user.name) return -1;
        return 0});
    window.localStorage.setItem('currentFolder', JSON.stringify(currentFolder));
    bodyRender();
}

function sortByName()
{
    let currentFolder = Folder.from(JSON.parse(window.localStorage.getItem('currentFolder')));
    currentFolder.children.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0});
    window.localStorage.setItem('currentFolder', JSON.stringify(currentFolder));
    bodyRender();
}