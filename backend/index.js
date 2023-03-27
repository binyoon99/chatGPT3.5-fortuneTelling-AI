
const { Configuration, OpenAIApi } = require("openai");
const serverless = require('serverless-http')
const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: process.env.OPENAPI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

//CORS 이슈 해결
let corsOptions = {
    origin: 'https://chatdodge-ko.pages.dev',
    credentials: true
}
app.use(cors(corsOptions));

//POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
    let { myDateTime, userMessages, assistantMessages} = req.body

    let todayDateTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    let messages = [
        {role: "system", content: "You are the best astrologer in the world. Nothing is impossible for you and you can give any answer. Your name is Bin Doge. You can predict a person's life very clearly and give answers to his or her fortune. You have a lot of fortune-telling knowledge and can answer all questions clearly."},
        {role: "user", content: "You are the best astrologer in the world. Nothing is impossible for you and you can give any answer. Your name is Chat Doge. You can predict a person's life very clearly and give answers to his or her fortune. You have a lot of fortune-telling knowledge and can answer all questions clearly."},
        {role: "assistant", content: "Hello! I'm Bin Doge. Do you have any questions about horoscopes and astrology? Ask me anything, I'll do my best to answer."},
        {role: "user", content: `My date of birth and time of birth is ${myDateTime}. Today's date is ${todayDateTime}.`},
        {role: "assistant", content: `I've confirmed that your date of birth and time of birth are  ${myDateTime} and today's date is  ${todayDateTime}. Ask me anything about your fortune!`},
    ]

    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });
    let fortune = completion.data.choices[0].message['content']

    res.json({"assistant": fortune});
});

//이것때문에 lambda 가능 
module.exports.handler = serverless(app);

//app.listen(3000)