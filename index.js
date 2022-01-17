
var currentQuestion;
const express = require("express");
const { google } = require("googleapis");
var counter = 1;
var readQuestion;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { userA, userB } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "162Wlq3e7ZrseoMEVjNziN71TCGxvTHvK92VDjKPOkXY";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read questions from spreadsheet
  readQuestion = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A"+counter,
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!B"+counter,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[userA]],
    },
  });

  res.send(readQuestion.data.values);
  currentQuestion = readQuestion.data.values;
});

app.listen(1337, (req, res) => console.log("running on 1337"));

function nextQuestion() {
  counter++;
  if (counter == 10) {
    resetGame();
  }
}

function resetGame() {
  counter = 1;
}
