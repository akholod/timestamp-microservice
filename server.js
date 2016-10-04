const express = require("express");
const moment = require("moment");
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
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

app.use(function(req, res, next) {
  res.status(404).end('Wrong time parameter');
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});