const http = require('http');
const url = require('url'); 
const { MongoClient } = require("mongodb"); 
const fs = require('fs');

const { Repository } = require('./Repository/repository');

http.createServer(function (req, res) {
  
  const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("hello");

  try {
      /*client.connect();
      client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");

      const repo = new Repository(client, "fileManager", { log(msg) { console.log(msg) } });*/

      // todo: parse url, find method, find parameters according to method
      //const path = new URL(req.url).pathname;
      //const reqUrlParams = new url.URLSearchParams(req.url);
      //const collection = reqUrlParams.get('collection');
      //const id = reqUrlParams.get(id);
      
      fs.readFileSync('index.html', "utf8", function(err, data) {
          if(err) {
              console.log(err);
              throw err;
          }
          res.write(data);
          console.log(data);
      });

  }
  catch(e) {
      console.log("error");
      console.log(e);
  } 
  finally {
      client.close();
      return res.end();
  }
  
}).listen(8080);