const http = require('http');
const url = require('url');
const { MongoClient } = require("mongodb");
const fs = require('fs');

const { Repository } = require('./Repository/repository');
const { File } = require('./Model/file');

function main() {
    const mongoClient = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {

        if (err) {
            return console.log(err);
        }

        try {
            const repo = new Repository(client, "fileManager", { log(msg) { console.log(msg) } });

            repo.create(new File(3, "hellowoworld3.js", 1, "2b"), "files");

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

main();