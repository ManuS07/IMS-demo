const express = require('express');
const route = require('./controllers/public/route');
const parser = require('body-parser');
const app = express();



app.use(parser.json({inflate:true}));
app.use("/api/v1", route);

app.listen(80);

