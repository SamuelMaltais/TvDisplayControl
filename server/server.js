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
  console.log(req.body.startDate + " " + req.body.endDate + " " + req.body.specialCode);
  if (!req.files) {
    res.send({
      status: false,
      message: 'No file uploaded'
    });
  }
  else {
    let avatar = req.files.picture;
    avatar.mv('./uploads/' + avatar.name);
    console.log("image downloaded");
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
        name: avatar.name,
        mimetype: avatar.mimetype,
        size: avatar.size
      }
    });
  }
})
app.listen(5000, () => { console.log("Server started on port 5000") }) 