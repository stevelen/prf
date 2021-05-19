const mongoose = require('mongoose')

var stockSchema = new mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    quantity : {type: Number, required: true}
}, {collection: 'stock'});

mongoose.model('stock', stockSchema);