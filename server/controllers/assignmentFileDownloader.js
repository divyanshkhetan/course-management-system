const path = require('path')
const fs = require('fs');

const assignmentFileDownloader = (req, res) => {

    const filename = `${req.body.assignmentid} - ${req.body.rollno}.pdf`
    res.sendFile(path.resolve(__dirname + `/../public/uploads/${filename}`));
    var data =fs.readFileSync(path.resolve(__dirname + `/../public/uploads/${filename}`));
    res.contentType("application/pdf");
    res.send(data);
}

module.exports = assignmentFileDownloader;