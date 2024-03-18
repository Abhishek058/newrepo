const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];

    for (const item of data) {
      if (typeof item === "number") {
        if (item % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (typeof item === "string" && item.match(/[a-zA-Z]/)) {
        alphabets.push(item.toUpperCase());
      }
    }

    const response = {
      is_success: true,
      user_id: req.body.user_id,
      email: req.body.email,
      roll_number: req.body.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
