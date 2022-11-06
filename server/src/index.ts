import express, { Application, Request, Response } from "express";
import cors from "cors";
const PORT: number = 5000;

const app: Application = express();

app.use(cors({ origin: "*" }));

//Controllers Routes
app.post("/", cors(), (req: Request, res: Response) => {
  res.send("Welcome to Express Server With TS & frontend");
});

app.listen(PORT, () => {
  console.log(`Server is running On http://127.0.0.1:${PORT}`);
});
