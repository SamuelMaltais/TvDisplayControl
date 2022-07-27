const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const date = new Date();
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.post("/upload", async (req, res) => {
  if (!req.files) {
    res.send({
      status: false,
      message: 'No file uploaded, please select a picture'
    });
  }
  else {

    let avatar = req.files.picture;
    avatar.mv('./uploads/' + req.body.startDate + " " + req.body.endDate);
    console.log("message uploaded");
    res.send({
      status: true,
      message: 'File is uploaded ! It will be displayed between' + req.body.startDate + " to: " + req.body.endDate,
      data: {
        name: avatar.name,
        mimetype: avatar.mimetype,
        size: avatar.size
      }
    });
  }
})
app.listen(5000, () => { console.log("Server started on port 5000") }) 