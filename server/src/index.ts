import express, { Application, Request, Response } from "express";
import cors from "cors";
const PORT: number = 5000;

const app: Application = express();

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

app.use(cors(corsOptions));

interface calculator {
  prev: number;
  curr: number;
  operation: string;
}

//Controllers Routes

app.post("/", (req: Request, res: Response) => {
  const { prev, curr, operation } = req.body as unknown as calculator;

  const result = {
    result: 0,
    status: "success",
    operation,
    message: "",
  };
  switch (decodeURIComponent(operation)) {
    case "/":
      result.result = prev / curr;
      break;
    case "*":
      result.result = prev * curr;
      break;
    case "-":
      result.result = prev - curr;
      break;
    case "+":
      result.result = prev + curr;
      break;

    default:
      result.status = "error";
      result.message = "invaile ";
      break;
  }
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running On http://localhost:${PORT}`);
});
