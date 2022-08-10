const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var fs = require('fs');
const e = require('express');
app.use(express.static(__dirname + '/public'));
const AWS = require('aws-sdk');
require('dotenv').config();
const params = {
  Bucket: 'tvdisplaycontrol',
  Delimiter: '',
}
const s3 = new AWS.S3({
  accessKeyId: process.env.KEY,
  secretAccessKey: process.env.SECRETKEY,
})

app.get("/delete", async (req, res) => {
  let elementstring = ""
  s3.listObjects(params, function (err, data) {
    if (err) { console.log(err) };
    data.Contents.forEach(element => {
      elementstring = elementstring + element.Key + " "
    });
    res.send({
      status: true,
      message: elementstring
    })
  })
})
app.post("/deleteRequest", (req, res) => {
  if (req.body.specialCode != "McGill is the best!") {
    res.send({
      status: false,
      message: "Wrong code"
    })
  }
  else {
    console.log(req.body.deletedFile)
    s3.deleteObject({ Bucket: 'tvdisplaycontrol', Key: req.body.deletedFile }, function (err, data) {
      if (err) res.send({ status: false, message: "Deletion failed" });
      else res.send({ status: false, message: "File deleted" });
    });
  }
});


app.get("/display", (req, res) => {
  let date = new Date();
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  var files = fs.readdirSync('./public');
  let addZeros = (num) => {
    return num < 10 ? `0${num}` : num;
  }
  var hour = addZeros(date.getHours());
  var minute = addZeros(date.getMinutes());
  let elementstring = "";
  s3.listObjects(params, function (err, data) {
    if (err) { console.log(err) };
    data.Contents.forEach(element => {
      var startDate = new Date(parseInt(element.Key[0] + element.Key[1] + element.Key[2] + element.Key[3]),
        parseInt(element.Key[5] + element.Key[6]) - 1, parseInt(element.Key[8] + element.Key[9]));
      var endDate = new Date(parseInt(element.Key[10] + element.Key[11] + element.Key[12] + element.Key[13]), parseInt(element.Key[15] + element.Key[16]) - 1,
        parseInt(element.Key[18] + element.Key[19]))
      let endHour = parseInt(element.Key[20] + element.Key[21])
      let endMinute = parseInt(element.Key[23] + element.Key[24])
      if (year == parseInt(element.Key[10] + element.Key[11] + element.Key[12] + element.Key[13]) && day == parseInt(element.Key[18] + element.Key[19]) && month == parseInt(element.Key[15] + element.Key[16])) {
        if (endHour > hour || (hour == endHour && minute < endMinute)) {
          elementstring += element.Key + " ";
          console.log("Same day, hour before end")
        }
      }
      if (date > startDate && date < endDate) {
        elementstring += element.Key + " ";
        console.log("Between the dates" + element.Key)
      }

    });
    res.send({
      status: true,
      message: elementstring
    })
  })


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
      let str = avatar.name;
      str = str.replace(/\s/g, '');
      let name = req.body.startDate + req.body.endDate + req.body.time + str
      const uploadedImage = await s3.upload({
        Bucket: "tvdisplaycontrol",
        Key: name,
        Body: avatar.data,
      }).promise()
      console.log("Posted")
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
app.listen(process.env.PORT || 5000, () => { console.log("Server started on port 5000") }) 