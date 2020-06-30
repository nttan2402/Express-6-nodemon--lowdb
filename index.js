var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ todo: [{id: 1, text: "balh blah..."}]}, { todos: []})
  .write()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: '6-nodemon--dbjson', message: 'TODO - LIST', 
  	todoList: db.get('todos').value()
   })
});

// search button
app.get('/todos', function (req, res) {
 	var q = req.query.q;
 	var matchedActive = db.get('todos').value().filter(function(active){
 		return  active.indexOf(q) !== -1;
 	});
 	res.render('index', {title: '6-nodemon--dbjson', message: 'TODO - LIST',
 		search: q,
 		todoList: matchedActive
 	});
});
//add button
app.post('/todos/create', function(req, res){
	db.get('todos').push(req.body.todo).write();
	res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

