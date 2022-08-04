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

app.get("/delete", (req, res) => {
  var files = fs.readdirSync('./public');
  let elementstring = ""
  files.forEach(element => {
    elementstring = elementstring + element + " "
  })
  res.send({
    status: true,
    message: elementstring
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
    let path = "./public/" + req.body.deletedFile;
    if (path != "./public/") {
      fs.unlink(path, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
        res.send({
          status: true,
          message: "File deleted"
        })
      });
    }
    else {
      res.send({
        status: false,
        message: "didnt work"
      })
    }
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
  files.forEach(element => {
    let startYear = parseInt(element[0] + element[1] + element[2] + element[3]);
    let startMonth = parseInt(element[5] + element[6]);
    let startDay = parseInt(element[8] + element[9]);
    let endYear = parseInt(element[10] + element[11] + element[12] + element[13]);
    let endMonth = parseInt(element[15] + element[16]);
    let endDay = parseInt(element[18] + element[19]);
    let endHour = parseInt(element[20] + element[21])
    let endMinute = parseInt(element[23] + element[24])
    if (endDay == day && endMonth == month && endYear == year) {
      if (endHour > hour || (endMinute > minute && hour == endHour)) {
        elementstring = elementstring + element + " ";
      }
    }
    else if (
      (endYear > year ||
        (endYear == year && endMonth > month))
      &&
      startYear <= year
    ) {
      elementstring = elementstring + element + " "
    }
    else if (
      startYear <= year &&
      startMonth <= month &&
      endMonth >= month &&
      endYear >= year &&
      !(endMonth == month && endDay < day) &&
      !(startMonth == month && startDay > day)
    ) {
      elementstring = elementstring + element + " "
    }
  });
  res.send({
    status: true,
    message: elementstring
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
      try {
        avatar.mv('./public/' + req.body.startDate + req.body.endDate + req.body.time + str);
      }
      catch{
        avatar.mv('./public/' + req.body.startDate + req.body.endDate + str);
      }
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
app.listen(process.env.PORT || 5000, () => { console.log("Server started on port 5000") }) 