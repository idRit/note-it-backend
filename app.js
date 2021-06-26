let noteController = require("./controllers/note.controller");

module.exports = app => {
    app.get('/', (req, res) => {
        res.json({
            message: "working"
        });
    });

    app.post("/api/processData", noteController.processData);
    app.get("/api/subjectList", noteController.subjectList);
    app.get("/api/:subject/tldr", noteController.tldrBySubject);
}