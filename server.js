// Dependencies Here!!
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/the-social', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Mongo log queries being excuted here!!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connecting to localhost:${PORT}`));