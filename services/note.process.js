const noteModel = require("../models/note.model");
const tldrModel = require("../models/tldr.model");

exports.saveNoteTranscript = async (subject, note, tags) => {
    try {
        let noteData = new noteModel({
            subject, transcript: note, tags
        });
        await noteData.save();
    } catch (error) {
        console.log("err: ", error);
        throw new Error("Something happened!");
    }
}

exports.saveNoteTldr = async (subject, note, tags) => {
    try {
        let noteData = new tldrModel({
            subject, tldr: note, tags
        });
        await noteData.save();
    } catch (error) {
        console.log("err: ", error);
        throw new Error("Something happened!");
    }
}

exports.getNoteTldrs = async subject => {
    try {
        let response = await tldrModel.find({ subject });
        return response;
    } catch (error) {
        console.log("err: ", error);
        throw new Error("Something happened!");
    }
}