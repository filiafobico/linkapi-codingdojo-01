const express = require('express');
const cripto = require('./cripto');
const decrypt = require('./decrypt');
const bodyParser = require('body-parser');
const { insert, getById } = require('./mongo-dao');

require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const response = await cripto(req.body, [
    'customers[0].document',
    'customers[0].email',
    'customers[0].last_name',
    'customers[0].phones[0].phone_number',
    'customers[0].phones[1].phone_number',
    'customers[0].phones[2].phone_number',
    'customers[0].addresses[0].postal_code',
    'customers[0].addresses[1].postal_code',
    'customers[0].addresses[0].street',
    'customers[0].addresses[1].street',
    'customers[0].addresses[0].number',
    'customers[0].addresses[1].number',
  ]);
  const mongoResponse = await insert(response);
  res.send(mongoResponse.insertedId);
});

app.get('/:_id', async (req, res) => {
  const _id = req.params._id;
  const documment = await getById(_id);

  const decripitado = await decrypt(documment,[
    'customers[0].document',
    'customers[0].email',
    'customers[0].phones[0].phone_number',
    'customers[0].phones[1].phone_number',
    'customers[0].phones[2].phone_number',
    'customers[0].addresses[0].postal_code',
    'customers[0].addresses[1].postal_code',
    'customers[0].addresses[0].street',
    'customers[0].addresses[1].street',
    'customers[0].addresses[0].number',
    'customers[0].addresses[1].number',
  ]);

  res.send(decripitado);
});

app.listen(3000, () => {
  console.log('server started');
});