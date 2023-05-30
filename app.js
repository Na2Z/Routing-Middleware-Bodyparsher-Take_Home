const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public/image', express.static(path.join(__dirname, 'public', 'image')));

app.use('/products', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
