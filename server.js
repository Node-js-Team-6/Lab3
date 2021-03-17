const express = require('express');
const { MongoClient } = require("mongodb");

const { File } = require('./Data/Model/file');
const { User } = require('./Data/Model/user');
const { Rating } = require('./Data/Model/rating');

const { FileRepository } = require('./Data/Repositories/fileRepository');
const { UserRepository } = require('./Data/Repositories/userRepository');
const { RatingRepository } = require('./Data/Repositories/ratingRepository');

const mongoClient = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });
mongoClient.connect((err, client) => {
    if (err) {
        return console.log(err);
    }

    try {
        const app = express();
        const dbName = "fileManager";
        const logger = { log(msg) { console.log(msg) }};

        app.use(express.json());
        app.use(express.static(__dirname + "/wwwroot"));

        app.get('/', function(request, response) {
            response.redirect('files');
        });

        app.get('/home', function(request, response) {
            response.redirect(files);
        });

        app.post('/file/delete/:id', function(request, response) {
            const id = request.params["id"];
            const fileRepo = new FileRepository(client, dbName, logger);
            fileRepo.delete(id);
            console.log(id);
        });

        app.post('/file/update', function(request, response) {
            const fileRepo = new FileRepository(client, dbName, logger);
            const name = request.body.name;
            const size = request.body.size;
            const idUser = request.body.idUser;
            const file = new File(name, idUser, size);
            file.ratingsId = request.body.ratingsId;
            file._id = request.body.id;
            file.rating =  request.body.rating;
            file.downloadCount = request.body.downloadCount;
            fileRepo.create(file);
        });

        app.post('/file/create', function(request, response) {
            const fileRepo = new FileRepository(client, dbName, logger);
            const name = request.body.name;
            const size = request.body.size;
            const idUser = request.body.idUser;
            const file = new File(name, idUser, size);
            fileRepo.create(file);
        });

        app.get('/file/:id', function(request, response) {
            const id = request.params["id"];
            const filesRepo = new FileRepository(client, dbName, logger);
            const userRepo = new UserRepository(client, dbName, logger);
            const ratingsRepo = new RatingRepository(client, dbName, logger);
            filesRepo.find(id, (file) => {
                userRepo.find(file?.idUser, (user) => {
                    ratingsRepo.loadRatings(file?.ratingsId, (ratings) => {
                        var result = {
                            file,
                            user,
                            ratings
                        };

                        console.log(result);
                        response.json(result);
                    })
                });
            });
        });

        app.get("/files", function (request, response) {
            const filesRepo = new FileRepository(client, dbName, logger);
            filesRepo.findMany({}, { name: 1}, (result) => {
                response.json(result);
            })
        });

        app.listen(8080).on('close', () => client.close());
    }
    catch (e) {
        console.log(e);
        client.close;
    }
});












/*function main() {
    const mongoClient = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {

        if (err) {
            return console.log(err);
        }

        try {
            //const repo = new Repository(client, "fileManager", { log(msg) { console.log(msg) } });
            //repo.create(new File(1, "helloworld.js", 1, '2b'), "files");
            //repo.find(1, "files", (result) => console.log(result));

            const fileRepo = new FileRepository(client, "fileManager", { log(msg) { console.log(msg) } });
            //fileRepo.findMany({}, {}, (result) => console.log(result));

            http.createServer(function (req, res) {
                res.writeHead(200, { 'Content-Type': 'text/html' });

                try {
                    // todo: parse url, find method, find parameters according to method
                    //const path = new URL(req.url).pathname;
                    //const reqUrlParams = new url.URLSearchParams(req.url);
                    //const collection = reqUrlParams.get('collection');
                    //const id = reqUrlParams.get(id);

                    fs.readFile('index.html', function (err, data) {
                        res.write(data);
                        res.end();
                    });

                }
                catch (e) {
                    console.log("error");
                    console.log(e);
                }

            }).listen(8080).on('close', () => client.close());
        }
        catch (e) {
            console.log('error');
            console.log(e);
            client.close();
        }
    });

}

main();*/