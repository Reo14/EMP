const multer = require("multer");
const fs = require('fs');

if (!fs.existsSync('./uploads/')) {
    fs.mkdirSync('./uploads/');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // 设置文件保存的目录
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // 设置文件名
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
