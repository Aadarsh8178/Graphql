const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
//connect to mongodb
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Listening on port 4000");
});
