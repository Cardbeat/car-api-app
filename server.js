
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Car = require('./app/models/car')
require('./routes')
require('./db')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const port = process.env.PORT || 3000


const router = express.Router()

router.use((req,res,next) => {
  console.log('Something is happening.')
  next()
})


router.get('/', (req, res) => {
  res.json({message: 'welcome to api'})
})

router.route('/cars')

  .post((req, res) => {
    const car = new Car();
    car.name = req.body.name;

    car.save((err) => {
      if (err)
        res.send(err)

      res.json({ message: 'Car created!' })
    })
  })

  .get((req, res) => {
     Car.find((err,cars) => {
      if (err)
        res.send(err)

     res.json(cars)
    })
  })

router.route('/cars/:car_id')
  .get((req, res) => {
    Car.findById(req.params.car_id, (err, car) => {
      if (err)
        res.send(err)

      res.json(car)
    })
  })

  .put((req, res) => {
    Car.findById(req.params.car_id, (err, car) => {
      if (err)
        res.send(err)
      car.name = req.body.name


      car.save((err) => {
        if (err)
          res.send(err)

        res.json({ message: 'Car updated!' })
      })
    })
  })
  
  .delete((req, res) => {
    Car.remove({
      _id: req.params.car_id
    }, (err, car) => {
      if (err)
        res.send(err)
      res.json({ message: 'Successfully deleted' })
    })
  })


app.use('/api', router);


app.listen(port)
console.log('localhost:' + port)
