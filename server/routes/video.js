const express = require('express');
const router = express.Router();
const multer = require('multer'); 

const { auth } = require("../middleware/auth");
//const { Video } = require("../models/Video"); 


// STORAGE MULTER CONFIG
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('Only mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file");


   
//=================================
//             Video
//=================================
 
router.post('/uploadfiles', (req, res) => {
        
        // Save videos into server
        upload(req, res, err => {
            if(err) {
                return res.json({ success: false, err})
            }
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        })
});

module.exports = router;