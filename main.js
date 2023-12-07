const express = require("express");
const cors = require("cors")
const app = express();

const bodyParser = require("body-parser");
const routes = require("./routes/routes");
require("dotenv").config();

app.use(cors())

// Provide limit ot body data

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

const port =  process.env.PORT

app.listen(port, ()=> {
  console.log(`you are in port ${port}`);
})
