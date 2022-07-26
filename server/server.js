const express = require('express');
const app = express();
const formidable = require('formidable');

app.use(express.json());

app.get("/display", (req, res) => {
  form.parse(req, function (err, fields, files) {
    if (err != null) {
      console.log(err)
      return res.status(400).json({ message: err.message });
    }
    const [firstFileName] = Object.keys(files);

    res.json({ filename: firstFileName });
  });
})
app.listen(5000, () => { console.log("Server started on port 5000") })