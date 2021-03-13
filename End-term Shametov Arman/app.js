var http = require("http");
var fileSystem = require("fs");
function serveStaticFile(res, path, contentType, responseCode) {
    responseCode = 200;
    fileSystem.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" })
            res.end("error.html");
        }
        else {
            res.writeHead(responseCode, { "Content-Type": contentType });
            res.end(data);
        }
    });
}
http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path){
        case "": 
            serveStaticFile(res, "/index.html", "text/html");//main page
            break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html");//about page
            break;
        case "/img1":
            serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg");//graduation img
            break;
        case "/img2":
            serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg");//study img
            break;
        case "/video":
            serveStaticFile(res, "/video/students/memes.mp4", "video/mp4");//video
            break;
        default:
            serveStaticFile(res, "error.html", "text/html");
            break;
    }
}).listen(3000);