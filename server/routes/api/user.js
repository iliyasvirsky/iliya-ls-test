const Users = require('../../models/Users');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

module.exports = (app) => {

  app.get('/api/me', (req, res, next) => {
    // normally i would take it from the cookie or make them log in
    Users.find({ id: 1 })
    .then((user) => {
      if(user.length) {
        res.send(user)
      } else {
        //create data incase none exist
        Users.create({name: 'Sammy Blue', id: 2, desc: 'Im very tall person'})
        Users.create({name: 'Eric Green', id: 3, desc: 'Im a little fat'})
        Users.create({name: 'Johnny Smith', id: 1, desc: 'Im just drunk'})
        .then((user) => {
          res.send(user)
        })
        .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
  });

  app.get('/api/image/:userId', (req, res, next) => {
    console.log('image get here', req.params.userId)
    
    Users.find({ id: req.params.userId })
    .then((user, err) => {
      console.log('image test ', user[0].image)
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
    console.log('req.params.userId ', req.params.userId)
    
    Users.find({ id: req.params.userId })
    .then((user) => {
      console.log('user', user)
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

  app.post('/api/user/:userId', function (req, res, next) {
    console.log('POST FOR SINGLE USER ', req.body)
    Users.find({ id: req.params.userId })
    .updateOne({$set: {name: req.body.user.name, desc: req.body.user.desc }}).then((err, updatedUser) => {
      console.log('err', err)
      if (err) {
        throw err
        res.status(500).send(err)
      }
      res.status(202).send(updatedUser)        
    })
  });

  app.post('/api/image/:userId',  upload.single('image'), (req, res) => {
    let formData = req.file;
    console.log('form data', req.params.userId, formData);
    let image= {};
    image.data = fs.readFileSync(formData.path);
    image.contentType = formData.mimetype;
    console.log('user image after',   image);
    Users.find({ id: req.params.userId })  
    .updateOne({$set: {image: image, imageType: formData.mimetype }}).then((err, updatedUser) => {
        console.log('err', err)
        if (err) {
          throw err
          res.status(500).send(err)
        }
        res.status(202).send(updatedUser)        
      })
    
    
    
    // .then((user) => {
    //   console.log('user image before', user)
    //   let image= {};
    //   image.data = fs.readFileSync(formData.path);
    //   image.contentType = formData.mimetype;
    //   console.log('user image after',   image);
    //   user.image = image
    //   user.imageType = formData.mimetype;
    //   // user.save();
    //   console.log('user saved()');
    // }).catch((err) => {
    //   console.log('error', err)
    // })
  });


  // app.post('/api/image/:userId', function (req, res, next) {
  //   console.log('user ', req.image)
  //   // let data = "not sync";
  //   // data = fs.readFileSync(req.files.path)
  //   console.log('data', data)

  //   // newItem.img.data
  //   // newItem.img.contentType = ‘image/png’;
  //   // newItem.save();      
  //   res.send('got it')
  // 
  // });
}