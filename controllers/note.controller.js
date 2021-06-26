const openAiProcessor = require("../services/openAI.process");
const noteProcessor = require("../services/note.process");

exports.processData = async (req, res) => {
    if (!req.body.subject || !req.body.transcript)
        return res.json({
            message: "fields missing!"
        });

    const response = {};
    let paragraph = "";

    try {
        paragraph = `Original: ${req.body.transcript.join()} \nStandard American English:`;
        let res = await openAiProcessor(paragraph, ["\n"]);
        response.cleaned = res.choices[0].text.trim();
    } catch (error) {
        return res.json({
            message: "some error occured"
        });
    }

    // try {
    //     paragraph = `Text: ${response.cleaned} \nKeywords:`;
    //     let tags = await openAiProcessor(paragraph, ["\n"]);
    //     response.tags = tags.choices[0].text.trim().split(", ").map(el => el.toUpperCase());
    // } catch (error) {
    //     return res.json({
    //         message: "some error occured"
    //     });
    // }

    response.tags = ["TEST"];

    try {
        paragraph = `${response.cleaned}. \ntl;dr:`;
        let tldr = await openAiProcessor(paragraph, ["\n"]);
        response.tldr = tldr.choices[0].text.trim();
    } catch (error) {
        return res.json({
            message: "some error occured"
        });
    }

    console.log("ResponseObject: ", response);

    try {
        await noteProcessor.saveNoteTranscript(req.body.subject, response.cleaned, response.tags);
        await noteProcessor.saveNoteTldr(req.body.subject, response.cleaned, response.tags);
        console.log("Data saved to Database!");
    } catch (error) {
        return res.json({
            message: "some error occured"
        });
    }

    return res.json({
        tldr: response.tldr
    });
}

exports.subjectList = async (req, res) => {
    let response = {};

    try {
        response = await noteProcessor.getSubjects();
    } catch (error) {
        return res.json({
            message: "some error occured"
        });
    }

    return res.json({ response });
}

exports.tldrBySubject = async (req, res) => {
    let response = {};

    try {
        response = await noteProcessor.getNoteTldrs(req.params.subject);
    } catch (error) {
        return res.json({
            message: "some error occured"
        });
    }

    return res.json({ response });
}