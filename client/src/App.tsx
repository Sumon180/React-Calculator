import { Container, Grid, Paper, styled, Button } from "@mui/material";
import React, { useState } from "react";
import { GridDigitButton } from "./GridDigitButton";
import { GridOperationButton } from "./GridOperationButton";
import axois from "axois";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2.5em",
  padding: theme.spacing(5),
  fontSize: "3em",
  overflow: "hidden",
}));
const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));
function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [prevValue, setprevValue] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!prevValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    let result: number = 0;

    // switch (operation) {
    //   case "/":
    //     result = prev / curr;
    //     break;
    //   case "*":
    //     result = prev * curr;
    //     break;
    //   case "-":
    //     result = prev - curr;
    //     break;
    //   case "+":
    //     result = prev + curr;
    //     break;
    // }
    var data = new FormData();
    data.append("a", "6");
    data.append("b", "5");
    data.append("c", "*");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "http://127.0.0.1:5000");

    xhr.send(data);
    return result;
  };

  const equals = () => {
    const val = calculate();
    setCurrentValue(`${val}`);
    setprevValue("");
    setOperation("");
    setOverwrite(true);
  };

  const clear = () => {
    setprevValue("");
    setOperation("");
    setCurrentValue("0");
    setOverwrite(true);
  };

  const del = () => {
    setCurrentValue("0");
    setOverwrite(true);
  };
  const percent = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
  };

  const selectOperation = (operation: string) => {
    if (prevValue) {
      const val = calculate();
      setCurrentValue(`${val}`);
      setprevValue(`${val}`);
    } else {
      setprevValue(currentValue);
    }
    setOperation(operation);
    setOverwrite(true);
  };
  const setDigit = (digit: string) => {
    if (currentValue[0] === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit == ".") return;
    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton
              operation={"AC"}
              selectOperation={clear}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"C"}
              selectOperation={del}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"%"}
              selectOperation={percent}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"/"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"7"} enterDigit={setDigit} />
            <GridDigitButton digit={"8"} enterDigit={setDigit} />
            <GridDigitButton digit={"9"} enterDigit={setDigit} />
            <GridOperationButton
              operation={"*"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"4"} enterDigit={setDigit} />
            <GridDigitButton digit={"5"} enterDigit={setDigit} />
            <GridDigitButton digit={"6"} enterDigit={setDigit} />
            <GridOperationButton
              operation={"-"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"1"} enterDigit={setDigit} />
            <GridDigitButton digit={"2"} enterDigit={setDigit} />
            <GridDigitButton digit={"3"} enterDigit={setDigit} />
            <GridOperationButton
              operation={"+"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"0"} enterDigit={setDigit} />
            <GridDigitButton digit={"00"} enterDigit={setDigit} />
            <GridDigitButton digit={"."} enterDigit={setDigit} />

            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
