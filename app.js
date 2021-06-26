let noteController = require("./controllers/note.controller");

module.exports = app => {
    app.get('/', (req, res) => {
        res.json({
            message: "working"
        });
    });

    app.post("/api/processData", noteController.processData);
}