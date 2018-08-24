const Users = require('../../models/Users');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

module.exports = (app) => {

  app.get('/api/me', (req, res, next) => {
    // normally i would take it from the cookie or make them log in
    const cookies = req.headers.cookie.split(';');
    Users.find({ id: cookies[0].split('=')[1], accessToken: cookies[1].split('=')[1] })
    .then((user) => {
      if(user.length) {
        res.send(user)
      } else {
        res.sendStatus(404)
      }
    })
    .catch((err) => next(err));
  });

  app.get('/api/image/:userId', (req, res, next) => {
    Users.find({ id: req.params.userId })
    .then((user, err) => {
      if (err) return next(err);
      if(user.length) {        
        res.contentType(user[0].imageType);
        res.send(user[0].image.data);
      } else {
        res.status(404).send('not found')
      }
    })
    .catch((err) => next(err));
  });


  app.get('/api/user/:userId', (req, res, next) => {
    
    Users.find({ id: req.params.userId })
    .then((user) => {
      if(user.length) {
        res.send(user)
      } else {
        res.status(404).send('not found')
      }
    })
    .catch((err) => next(err));
  });
  
  
  app.get('/api/users', (req, res, next) => {
    // limit only name and desc
    Users.find({},  { id: 1, name: 1, desc: 1 })
    .then((user) => {
       res.send(user)
     })
    .catch((err) => next(err));
  });
  
  app.post('/api/login', (req, res, next) => {
    //create data incase none exist
    
    Users.find({},  { id: req.body.userID})
    .then((user) => {
      if(user.length) {
        //if it finds users
        
        res.send(user)
      } else {
        Users.create({name: req.body.name, id: req.body.userID, desc: '', accessToken: req.body.accessToken})
        .then((user) => {
          res.send(user)
        })
        .catch((err) => next(err));
      }
     })
    .catch((err) => next(err));  
  });
  
  
  app.post('/api/user/:userId', function (req, res, next) {
    const cookies = req.headers.cookie.split(';');
    Users.find({ id: cookies[0].split('=')[1], accessToken: cookies[1].split('=')[1] })
    .updateOne({$set: {name: req.body.user.name, desc: req.body.user.desc }}).then((err, updatedUser) => {
      if (err) {
        throw err
        res.status(500).send(err)
      }
      res.sendStatus(202)        
    })
    .catch((err) => res.status(401).send(err))
    
  });

  app.post('/api/image/:userId',  upload.single('image'), (req, res) => {
    let formData = req.file;
    let image= {};
    image.data = fs.readFileSync(formData.path);
    image.contentType = formData.mimetype;
    const cookies = req.headers.cookie.split(';');
    // can only push to your own so ill read cookie 
    Users.find({ id: cookies[0].split('=')[1], accessToken: cookies[1].split('=')[1] })
    .updateOne({$set: {image: image, imageType: formData.mimetype }}).then((err, updatedUser) => {
        if (err) {
          throw err
          res.status(500).send(err)
        }
        res.status(202).send(updatedUser)        
      })
    .catch((err) => res.status(401).send(err))
  });


}