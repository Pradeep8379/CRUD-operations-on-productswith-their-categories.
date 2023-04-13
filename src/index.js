const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://PradeepPatil:vp0T2toXsM1QqQAo@cluster0.h3sgz2m.mongodb.net/products', {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});