const moment = require("moment");
const path = require("path");

module.exports = function (app) {
    app.get('/', (req, res) => {
    var root = path.parse(__dirname)
    res.sendFile(root.dir + '/public/home.html');
})

app.get('/:timeParam', function (req, res) {
    var timeStr = req.params.timeParam;
    var availableFormats = ["MMMM-DD-YYYY", "MMMM-YYYY-DD", "MM-DD-YYYY", "DD-MM-YYYY", "DD-MM-YY", "MM-DD-YYYY", "YYYY-MM-DD", "YYYY-DD-MM"];
    var output = {
        "unix": "",
        "natural": ""
    };
    
    if (!isNaN(timeStr)) {
        var time = moment.unix(timeStr);
        output.unix = parseInt(timeStr);
        output.natural = time.format('MMMM DD, YYYY');
        res.end(JSON.stringify(output));
    }
    
    if(moment(timeStr, availableFormats).isValid()) {
        output.natural = moment(timeStr, availableFormats).format('MMMM DD, YYYY');
        output.unix = moment(timeStr, availableFormats).unix();
         res.end(JSON.stringify(output));
    } else {
        output.natural = null;
        output.unix = null;
        res.end(JSON.stringify(output));
    }
});
}