const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:CoronaNaPrf@2020@prf-5gwgv.gcp.mongodb.net/codedojo?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect( err => {
  if (err) {
    console.error(err);
    exit(1);
  }
  global.db = client.db("cript");
  console.info('Connected on database');
});