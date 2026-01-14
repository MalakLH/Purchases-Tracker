const express= require('express');
const cors= require('cors');
require('dotenv').config();
const Purchase = require('./models/purchase.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req,res) => {
    res.json({body: 'test'});
});

app.post('/api/purchase', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name,price,description, datetime} = req.body;
    const purchase = await Purchase.create({name,price,description, datetime});
    res.json(purchase);
});

app.get('/api/purchases', async (req,res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const purchases = await Purchase.find();
  res.json(purchases);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});