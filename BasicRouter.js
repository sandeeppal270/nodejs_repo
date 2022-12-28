'use strict';
const http = require('http');
const url = require('url');
let routes= {
    'GET':{
        '/' :(req,res)=>{
            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1>Hello router</h1>');
        },
        '/about' :(req,res)=>{
            res.writeHead(200,{'content-type':'text/html'});
            res.end('<h1>This is about page</h1>');
        },
        '/api/getinfo' :(req,res)=>{
            //fetch data from DB and respond in JSON
            res.writeHead(200,{'content-type':'application/json'});
            res.end(JSON.stringify(req.queryParams));
        }
    },
    'POST':{

    },
    'NA': (req,res) => {
        res.writeHead(404);
        res.end('Content not found !');
    }

}
function router(req,res){
    let baseURI = url.parse(req.url,true);
    let resolveRoute = routes[req.method][baseURI.pathname];
    if(resolveRoute != undefined){
        req.queryParams = baseURI.query;
        resolveRoute(req,res);
    }else{
        routes['NA'](req,res);
    }
}
http
   .createServer(router).listen(3000,()=>{
      console.log('Server running on port 3000'); 
   })