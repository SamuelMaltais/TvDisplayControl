const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const date = new Date();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var fs = require('fs');

app.get("/display", (req, res) => {
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  var files = fs.readdirSync('./uploads');
  files.forEach(element => {
    let startYear = parseInt(element[0] + element[1] + element[2] + element[3]);
    let startMonth = parseInt(element[5] + element[6]);
    let startDay = parseInt(element[8] + element[9]);
    let endYear = parseInt(element[10] + element[11] + element[12] + element[13]);
    let endMonth = parseInt(element[15] + element[16]);
    let endDay = parseInt(element[18] + element[19]);
    if (
      startYear <= year &&
      startMonth <= month &&
      endMonth >= month &&
      endYear >= year &&
      !(endMonth == month && endDay < day) &&
      !(startMonth == month && startDay > day)
    ) {
      console.log(day + " " + month + " " + year)
      res.sendFile("uploads/" + element, { root: __dirname });
      setTimeout(function () {
        console.log("Waiting")
      }, 5000);
    }
  });


})
app.post("/upload", async (req, res) => {
  if (!req.files) {
    res.send({
      status: false,
      message: 'No file uploaded, please select a picture'
    });
  }
  else {
    if (req.body.specialCode != "McGill is the best!") {
      res.send({
        status: false,
        message: "Wrong code"
      })
    }
    else {
      let avatar = req.files.picture;
      avatar.mv('./uploads/' + req.body.startDate + req.body.endDate + avatar.name);
      console.log("message uploaded");
      res.send({
        status: true,
        message: 'File is uploaded ! It will be displayed between ' + req.body.startDate + " to: " + req.body.endDate,
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  }
})
app.listen(5000, () => { console.log("Server started on port 5000") }) 