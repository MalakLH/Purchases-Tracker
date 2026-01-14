const mongoose= require('mongoose');
const {Schema,model} = mongoose;

const purchaseSchema = new Schema({
    name: {type: String, required:true},
    price: {type: Number, required:true},
    description: {type: String, required:true},
    datetime: {type: Date, required:true},
});

const purchaseModel = model('purchase', purchaseSchema);

module.exports = purchaseModel;