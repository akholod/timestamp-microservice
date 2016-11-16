const moment = require("moment");
const path = require("path");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var root = path.parse(__dirname)
    res.sendFile(root.dir + '/public/home.html');
})

router.get('/:timeParam', function (req, res) {
    var timeStr = req.params.timeParam;
    var availableFormats = ["MMMM-DD-YYYY", "MMMM-YYYY-DD", "MM-DD-YYYY", "DD-MM-YYYY", "DD-MM-YY", "MM-DD-YYYY", "YYYY-MM-DD", "YYYY-DD-MM"];

    
    if (!isNaN(timeStr)) {
        var time = moment.unix(timeStr);
        res.json({
            "unix": parseInt(timeStr),
            "natural": time.format('MMMM DD, YYYY')
        });
    }
    
    if(moment(timeStr, availableFormats).isValid()) {
        res.json({
            "unix": moment(timeStr, availableFormats).unix(),
            "natural": moment(timeStr, availableFormats).format('MMMM DD, YYYY')
        });
    } else {
        res.status(400).json({
            "unix": null,
            "natural": null
        });
    }
});
module.exports = router;