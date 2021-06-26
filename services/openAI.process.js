require('dotenv').config()

const fetch = require("node-fetch");

const run = async (prompt, stop, engine) => {
    let body = JSON.stringify({
        prompt,
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        stop
    });
    let resp = await (await fetch(`https://api.openai.com/v1/engines/${engine ? engine : "davinci"}/completions`, {
        body,
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    })).json();

    console.log("OpenAI Response: ", resp);
    return resp;
}

module.exports = run;