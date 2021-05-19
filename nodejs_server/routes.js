const express = require('express');
const router = express.Router();

const passport = require('passport');
const mongoose = require('mongoose');
const stockModel = mongoose.model('stock');
const userModel = mongoose.model('user');

router.route('/login').post((req, res, next) => {
    if(req.body.username, req.body.password){
        passport.authenticate('local', function(error, user){
            if(error) return res.status(500).send(error);
            req.login(user, function(error) {
                if(error) return  res.status(500).send(error);
                return res.status(200).send("Login successful");
            })
        })(req, res);
    } else {
        return res.status(400).send("missing username or pw");
    }
})

router.route('/logout').post((req, res, next) => {
    if(req.isAuthenticated()){
        req.logout();
        return res.status(200).send({message: "Logout successful"});
    } else {
        return res.status(403).send("was not logged in");
    }
})

router.route('/purchase').put((req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).send("not logged in");
    }
    if(req.body.name){
        stockModel.findOne({name : req.body.name}, (err, item) => {
            if(err) return res.status(500).send("DB error");
            if(item){
                item.quantity -= 1;
                item.save((error) => {
                    if(error) return res.status(500).send('purchase failed');
                    return res.status(200).send('successful purchase');
                })
            } else {
                return res.status(400).send('item does not exist');
            }
        })
    } else {
        return res.status(400).send("item name missing");
    }
})

router.route('/user').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if(err) return res.status(500).send("DB error");
        res.status(200).send(users);
    })
}).post((req, res, next) => {
    if(req.body.username && req.body.email && req.body.password){
        userModel.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('DB error');
            if(user){
                return res.status(400).send("username already exists");
            }
            const usr = new userModel({username: req.body.username, password: req.body.password, email: req.body.email});
            usr.save((error) => {
                if(error) return res.status(500).send("error during saving");
                return res.status(200).send('save successful');
            })
        })
    } else {
        return res.status(400).send("missing username, email or pw");
    }
})


router.route('/stock').get((req, res, next) => {
    stockModel.find({}, (err, items) => {
        if(err) return res.status(500).send("DB error");
        res.status(200).send(items);
    })
}).post((req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).send("not logged in");
    }
    if(req.session.passport.user.accessLevel != "admin"){
        return res.status(403).send("only admins can do that");
    }
    if(req.body.id && req.body.name && req.body.price && req.body.quantity){
        stockModel.findOne({id : req.body.id}, (err, item) => {
            if(err) return res.status(500).send("DB error");
            if(item){
                return res.status(400).send('id already exists');
            } else {
                stockModel.findOne({name : req.body.name}, (err, item) => {
                    if(err) return res.status(500).send("DB error");
                    if(item){
                        return res.status(400).send('name already exists');
                    } else {
                        if(req.body.id < 0) return res.status(403).send('invalid id');
                        if(req.body.price < 0) return res.status(403).send('invalid price');
                        if(req.body.quantity < 0) return res.status(403).send('invalid quantity');
                        const item = new stockModel({id: req.body.id, name: req.body.name, price: req.body.price, quantity: req.body.quantity});
                        item.save((error) => {
                        if(error) return res.status(500).send('error during saving');
                        return res.status(200).send('save successful');
                        });
                    }
                });
                
            }
        });
    } else {
        return res.status(400).send("missing data");
    }

}).put((req, res, next) => {
    if(!req.isAuthenticated()){
        return res.status(403).send("not logged in");
    }
    if(req.session.passport.user.accessLevel != "admin"){
        return res.status(403).send("only admins can do that");
    }

    if(req.body.name && req.body.quantity){
        stockModel.findOne({name : req.body.name}, (err, item) => {
            if(err) return res.status(500).send("DB error");
            if(item){
                if (req.body.quantity > 0) item.quantity += req.body.quantity; else return res.status(403).send('invalid quantity');
                item.save((error) => {
                    if(error) return res.status(500).send('error during saving');
                    return res.status(200).send('save successful');
                })
            } else {
                return res.status(400).send('item does not exist');
            }
        })
    } else if(req.body.name && req.body.price){
        stockModel.findOne({name : req.body.name}, (err, item) => {
            if(err) return res.status(500).send("DB error");
            if(item){
                if (req.body.price > 0) item.price = req.body.price; else return res.status(403).send('invalid price');
                item.save((error) => {
                    if(error) return res.status(500).send('error during saving');
                    return res.status(200).send('save successful');
                })
            } else {
                return res.status(400).send('item does not exist');
            }
        })
    } else {
        return res.status(400).send("no item name or no quantity");
    }

})

module.exports = router;