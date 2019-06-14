export default function (app, db) {

  //Routes

  app.get('/', (req, res) => {
    console.log(db);
    db.collection('test').find({}).toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs); //Response to Api Call
      }
    });
  });

  app.post('/', (req, res) => {

    let data = req.body;
    res.send(data); //Response to Api Call

  });

  app.post('/user', (req, res) => {

    let data = req.body;
    res.send(data); //Response to Api Call

  });





  return app;
}