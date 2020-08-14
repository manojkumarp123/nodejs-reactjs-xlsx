// var http = require('http');
let XLSX = require("xlsx");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const excelFile = "./data/data.xlsx";
// const sheetName = "Sheet1";

app.get("/", (req, res) => {
  let workbook = XLSX.readFile(excelFile);
  sheet1Name = workbook.SheetNames[0]
  let sheet = workbook.Sheets[sheet1Name];
  let jsonObj = XLSX.utils.sheet_to_json(sheet);
  res.send(jsonObj);
});

app.post("/", (req, res) => {
  const workbook = XLSX.readFile(excelFile);
  sheet1Name = workbook.SheetNames[0]
  workbook.Sheets[sheet1Name] = XLSX.utils.json_to_sheet(req.body);
  XLSX.writeFile(workbook, excelFile);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
