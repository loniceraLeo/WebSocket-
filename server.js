//在实际应用中eventSource仍然是好用的api，不要完全依赖websocket,即使它真的很香

let clog=console.log,cerr=console.error;
let fs=require('fs');
let http=require('http');
let net=require('net');
let {URL}=require('url');
let ws=require('nodejs-websocket');

let jQuery=fs.readFileSync('C://users/86189/desktop/HTML学习代码/index/jquery-3.4.1.min.js');
let index=fs.readFileSync('./index.html')

let body='';
let httpserver=http.createServer((req,res)=>{
	clog(req.method+' '+req.url);
	if (req.url==='/'){
		res.writeHead(200,{'content-Type':'text/html;charset=utf8'});
		res.end(index);
	}
	if (req.url==='/jquery-3.4.1.min.js'){
		res.writeHead(200,{'content-Type':'text/script;charset=utf8'});
		res.end(jQuery);
	}
	else {
		res.writeHead(404,{'content-Type':"text/html;charset=utf8"});
		res.end('<p style="font-size:36px;font-weight:bolder">404 not found</p>')
	}
});
function broadcast(srv,msg){
	srv.connections.forEach(connect=>connect.sendText(msg));
}
let wssrv=ws.createServer(connect=>{
	clog('success');
	connect.on('text',$=>broadcast(wssrv,$));
	clog(wssrv.socket);
}).listen(1001,_=>clog('ok'));
httpserver.listen(1000,_=>clog('on listen'));
