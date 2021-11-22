const express = require('express');
const app = express();
const cors = require('cors');

//app uses
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mongodb + mongoose
const mongoose = require('mongoose');
const userModel = require('../db/db.js').userModel;

app.get('/', (req, res) => {

    userModel.find({}, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    })

})

app.post('/', (req, res) => {
    const { name, cash, credit, isActive } = req.body;
    const user = new userModel({
        name: name,
        cash: cash,
        credit: credit,
        isActive: isActive
    })
    user.save()
    res.status(200).json(user)
})

app.put('/:id', (req, res) => {
    const user = req.body;
    userModel.findByIdAndUpdate(user._id, user, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.status(200).json(user)
        }
    })
    return res.status(400).status('User Not Found')
})

app.get('/:id', (req, res) => {
    const id = req.params.id;

    userModel.findById({ _id: id }, (err, data) => {
        if (err) throw err;
        if (data) {
            res.status(200).json(data)
            return;
        }

    })

    // res.status(404).send('User Not Found')
})
mongoose.connect('mongodb+srv://AmeerLala:ameerlala123@cluster0.i5wcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(data => {
        app.listen(process.env.PORT || 4000)
    })
    .catch(err => console.log(err))



