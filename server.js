/**
 * Http server for simple Backbone application.
 * Http port: 8080
 *
 * @Require:
 *          fs module;
 *          http module;
 *          path module;
 *          connect module;
 *
 * Main routes are:
 *              /items     - will return collection of items
 *              /items/:id - will return model of item.
 *
 * @author Ievgen Neiman
 */



var fs = require('fs');
var httpServer = require('http');
var path = require('path');
var connect = require('connect');

var httpPort = 3000;

var extensions = {
    'js'   : 'text/javascript',
    'css'  : 'text/css',
    'txt'  : 'text/plain',
    'xml'  : 'application/xml',
    'jpg'  : 'image/jpg',
    'jpeg' : 'image/jpeg',
    'json' : 'application/json',
    'gif'  : 'image/gif',
    'png'  : 'image/png',
    'svg'  : 'image/xml+svg'
};
/**
 * Main function what will start our server
 */
function main() {
    new HttpServer().start(httpPort);
}
/**
 * Http server constructor
 * @constructor
 */
function HttpServer() {
    this.server = httpServer.createServer(this.onHtmlRequestHandler.bind(this));
}
/**
 * Parse string
 * @param value
 * @return {String}
 */
function escapeHtml(value) {
    return value.toString().
        replace('<', '&lt;').
        replace('>', '&gt;').
        replace('"', '&quot;');
}
/**
 * Return fiels to render in browser.
 * @param filePath
 * @param contentType
 * @param response
 */
HttpServer.prototype.sendHTML = function (filePath, contentType, response) {
    var me = this;

    fs.exists(filePath, function (exists) {
        if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    me.sendError(filePath, response, error);
                } else {
                    response.writeHead(200, { 'Content-Type' : contentType });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            me.sendMissing(filePath, response);
        }
    });
}
/**
 * Will start server in port what we will pass.
 * @param {Integer} port
 */
HttpServer.prototype.start = function (port) {
    this.port = port;
    this.server.listen(port);
    console.log('Http Server running at http://localhost:' + port + '/');
}
/**
 * Will get file path and return it
 * @param url
 * @return {String}
 */
HttpServer.prototype.getFilePath = function (url) {
    var filePath = url;
    if (url == '/') {
        filePath = 'index.html';
    } else {
        filePath = url.substr(1);
    }
    console.log("url: " + filePath);

    return filePath;
}
/**
 * Handle http requests.
 * @param request
 * @param response
 */
HttpServer.prototype.onHtmlRequestHandler = function (request, response) {
    var filePath = this.getFilePath(request.url);
    var contentType = extensions[path.extname(filePath).substr(1)];
    var method = request.method;
    console.log('onHtmlRequestHandler... request.url: ' + request.url);

    console.log('onHtmlRequestHandler... getting: ' + filePath);
    if (!request.url.indexOf('/items/')) {
        switch (method) {
            case 'GET'    :
                this.getItem(request, response);
                break;
            case 'DELETE' :
                this.deleteItem(request, response);
                break;
            case 'POST'   :
            case 'PUT'    :
            case 'UPDATE' :
                this.saveItem(request, response);
                break;
        }
        return;
    }

    if (!request.url.indexOf('/items')) {
        if (method === 'POST'){
            this.saveItem(request, response);
        } else{
            this.getItems(request, response);
        }
        return;
    }

    this.sendHTML(filePath, contentType, response);
}
/**
 * Will delete item from file system
 * @param req Request
 * @param res Response
 */
HttpServer.prototype.deleteItem = function (req, res) {
    var url = __dirname + req.url + '.json';
    var me = this;

    url = url.replace('/', '\\');
    fs.exists(url, function (exists) {
        if (exists) {
            item = fs.readFileSync(url);
            fs.unlink(url, function (error){
                if (error) {
                    me.sendError(url, res, error);
                } else {
                    res.writeHead(200, {
                        'Content-Type' : 'application/json'
                    });
                    res.write(JSON.stringify(JSON.parse(item)));
                    res.end();
                    console.log('File was successfully removed!')
                }
            });
        } else {
            me.sendMissing(url, res);
        }
    });
}
/**
 * Return Array of Items
 * @param req Request
 * @param res Response
 */
HttpServer.prototype.getItems = function (req, res) {
    var arr = [];
    var url = req.url.substr(1);

    var files = fs.readdirSync(url);

    for (var i = 0; i < files.length; i++) {
        arr.push(JSON.parse(fs.readFileSync(url + '/' + files[i])));
    }
    res.writeHead(200, {
        'Content-Type' : 'application/json' || 'text/plain'
    });

    if (req.method === 'HEAD') {
        res.end();
        return;
    }
    else {
        res.write(JSON.stringify(arr), 'utf8');
        res.end();
    }
}
/**
 * Will save file to file system.
 * @param req Request
 * @param res Response
 */
HttpServer.prototype.saveItem = function (req, res) {
    var me = this;
    var reqBody = '';
    var url = req.url.substr(1) + '.json';
    var dirName = path.dirname(req.url.substr(1)) + '/';
    var fileName = path.basename(req.url.substr(1));
    var fileBody = '';

    if (dirName === './'){
        dirName = 'items/'
    }
    var len = fs.readdirSync(dirName).length;
    var id = len;
	
    if (req.method === 'POST') {
        if (fileName ==='.json' || fileName === 'undefined.json' || fileName === 'undefined' || fileName === ''|| fileName === 'items'){
            for (var i = 0; i < len; i++){
                if(!fs.existsSync(dirName + i + '.json')) {
                    url = dirName + i + '.json';
                    id = i;
                    break;
                } else {
					url = dirName + len + '.json';
                }
            };
        }
    };
	
	if (len === 0){
		url = dirName + len + '.json';
	};
	
    req.on('data', function (chunk) {
        // Append the current chunk of data to the reqBody variable
        reqBody += chunk;
    });

    req.on('end', function () {
        res.writeHead(200, "OK", {
            'Content-Type' : 'application/json'
        });
        fileBody = JSON.stringify(me.addIdNumber(reqBody, id));
        res.write(fileBody);
        res.end();

        fs.writeFile(url, fileBody, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('The file has been saved at ' + url);
            }
        });
    });
}
/**
 * Return Item
 * @param req Request
 * @param res Response
 */
HttpServer.prototype.getItem = function (req, res) {
    var url = __dirname + req.url + '.json';
    var me = this;
    var item;

    url = url.replace('/', '\\');

    fs.exists(url, function (exists) {
        if (exists) {
            item = fs.readFileSync(url);
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            });
            res.write(JSON.stringify(JSON.parse(item)));
            res.end();
        } else {
            me.sendMissing(url, res);
        }
    });
}
/**
 * Will add ID to item if not exist
 * @param {String} body. Item body
 * @param {Integer} id. Id to item
 * @return {Object} Item
 */
HttpServer.prototype.addIdNumber = function (body, id){
    var val = JSON.parse(body);

    if (val.id === undefined || val.id === null){
        val.id = id;
    }
    return val;
}
/**
 * Will send message about not implemented functionality.
 * @param req Request
 * @param res Response
 */
HttpServer.prototype.sendNotImplemented = function (req, res) {
    var reqBody = '<div>' + req.method + ' isn\'t implemented yet!</div>';
    res.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    res.write(reqBody);
    res.end();
    console.log(req.method + ' isn\'t implemented yet!');
}
/**
 * Will send 404 not found message.
 * @param {String} url
 * @param res Response
 */
HttpServer.prototype.sendMissing = function (url, res) {
    res.writeHead(404, {
        'Content-Type' : 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>404 Not Found</title>\n');
    res.write('<h1>Not Found</h1>');
    res.write('<p>The requested URL ' + escapeHtml(url) + ' was not found on this server.</p>');
    res.end();
    console.log('File not found!');
}
/**
 * Will send 500 error message.
 * @param {String} url
 * @param res Response
 * @param {String} error Error message
 */
HttpServer.prototype.sendError = function (url, res, error) {
    res.writeHead(500, {
        'Content-Type' : 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + escapeHtml(error) + '</pre>');
    res.end();
    console.log('Internal Server Error!')
}

/**
 * Will start our server;
 */

main();
