var express 		= require('express'),
		morgan			=	require('morgan'),
		bodyParser	=	require('body-parser'),
		path				=	require('path'),
		http				=	require('http'),
		app					=	express();

var rootPath	=	path.normalize(__dirname + '/');

app.use(express.static(rootPath));

var port = 8000;
app.listen(port);
console.log('App listening on  port ' + port + '!!!!!!!');
