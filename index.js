const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.towih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const servicesCollection = client
      .db("doctors-portal")
      .collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const services = await servicesCollection.find(query).toArray();
      res.send(services);
    });

    // app.get("/services", async (req, res) => {
    //   const query = {};
    //   const cursor = servicesCollection.find(query);
    //   const services = await cursor.toArray();
    //   res.send(services);
    // });
  } finally {
    // await client.close();
  }
}
main().catch(console.dir);

//Root Routes
app.get("/", (req, res) => {
  res.send("Backend Server IS Running ");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
