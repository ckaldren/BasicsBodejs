var _ = require('lodash');
var Cat = require('./cat_model');
module.exports = function(app) {

    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function(err) {
            if (err) {
                res.json({info: 'error during cat create', error: err});
            }
            else {
            	res.json({info: 'cat created successfully', id: newCat._id});
            }
        });
    });

    /* Read */
    app.get('/cat', function (req, res) {
        Cat.find(function(err, cats) {
            if (err) {
                res.json({info: 'error during find cats', error: err});
            }
            else {
            	res.json({info: 'cats found successfully', data: cats});
            }
        });
    });

    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            }
            else {
            	if (cat) {
            		res.json({info: 'cat found successfully', data: cat});
            	} else {
            		res.json({info: 'cat not found'});
            	}
            }
        });
    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            }
            else {
            	if (cat) {
            		_.merge(cat, req.body);
            		cat.save(function(err) {
            			if (err) {
            				res.json({info: 'error during cat update', error: err});
            			};
            			res.json({info: 'cat updated successfully'});
            		});
            	} else {
            		res.json({info: 'cat not found'});
            	}
            }
        });
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            }
            else {
            	res.json({info: 'cat removed successfully'});
            }
        });
    });


};

// module.exports = function(app) {
//
// let cats = [];
//
// /* Create */
// app.post('/cat', function (req, res) {
// cats.push(req.body);
// res.json({info: 'cat created successfully'});
// });
//
// /* Read */
// app.get('/cat', function (req, res) {
// res.send(cats);
// });
//
// app.get('/cat/:id', function (req, res) {
// res.send(cats.find(function(item){
// return item.name === req.params.id;
// }));
// });
//    
// /* Update */
// app.put('/cat/:id', function (req, res) {
// var index = cats.findIndex(function(item){
// return item.name === req.params.id;
// });
// cats[index] = req.body;
// res.json({info: 'cat updated successfully'});
// });
//
// /* Delete */
// app.delete('/cat/:id', function (req, res) {
// var index = cats.findIndex(function(item){
// return item.name === req.params.id;
// });
// cats.splice(index, 1);
// res.json({info: 'cat removed successfully'});
// });
//
//
// };
