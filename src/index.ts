import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

let PORT = process.env.PORT || 4191;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs)
};

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.static("uploads"));



app.use(cors(corsOptions));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ info: "Server is up!" });
});

app.listen(PORT, () => console.log(`server started at ${PORT} `));
