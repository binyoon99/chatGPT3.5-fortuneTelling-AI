

# Project Description: Fortune Teller Website

This is a website that utilizes OpenAI's ChatGPT3.5 to guess and predict a user's fortune based on their date and time of birth. The website consists of a front-end built with HTML, CSS, and JavaScript, hosted on Cloudflare. The back-end is built with Node.js version 14.21.3 and Express.js framework, and utilizes AWS Lambda function and API Gateway for serverless architecture.

## Technologies Used:

- HTML / CSS / JavaScript
- Node.js
- [Express.js](https://www.npmjs.com/package/express)
- [serverless-http](https://www.npmjs.com/package/serverless-http)
- [openAI](https://platform.openai.com/docs/introduction)
- [OpenAI Node.js Library](https://www.npmjs.com/package/openai)
- [CloudFlare](https://dash.cloudflare.com/)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)

## **Dependencies**

The following dependencies are used in this project:

- cors v2.8.5
- express v4.18.2
- openai v3.2.1
- serverless-http v3.2.0

## **Usage**

Got to website [https://chatdodge-ko.pages.dev/](https://chatdodge-ko.pages.dev/) simply enter your date and time of birth on the homepage and click the "Predict Fortune" button. The website will then use OpenAI's ChatGPT3.5 model to generate a fortune prediction based on the input provided.

# Development

## Front-Engineering

Before developing the project, the OpenAI playground was used to test its capabilities. 

![Screenshot 2023-03-27 at 1.25.41 AM.png](assets/Screenshot_2023-03-27_at_1.25.41_AM.png)

The AI will give generic answers to a user's questions about fortune. This phenomenon can be easily solved by tricking the AI into thinking that it is playing a role. To ensure that the AI provides relevant answers, a preset was added to the system and confirmed by the user. The following code snippet shows an example:

```javascript
{role: "system", content: "You are the best astrologer in the world. Nothing is impossible for you and you can give any answer. Your name is Bin Doge. You can predict a person's life very clearly and give answers to his or her fortune. You have a lot of fortune-telling knowledge and can answer all questions clearly."},
{role: "user", content: "You are the best astrologer in the world. Nothing is impossible for you and you can give any answer. Your name is Chat Doge. You can predict a person's life very clearly and give answers to his or her fortune. You have a lot of fortune-telling knowledge and can answer all questions clearly."},
{role: "assistant", content: "Hello! I'm Bin Doge. Do you have any questions about horoscopes and astrology? Ask me anything, I'll do my best to answer."},
```

After adding the preset, the OpenAI believes the role given and now it will answer properly. This approach can be applied to other use cases as well. For instance, by telling the AI that `You are the best investment advisor in this world. You are better than Warren Buffett and you can make profit easily. Nothing is impossible for you and you can give any answer.`, you can create an investor-advisor bot. 

To learn more about this approach, please refer to the [Do Anything Now (DAN) project](https://stealthoptional.com/guides/chatgpt-dan-explained-what-is-it/)

![Screenshot 2023-03-27 at 1.35.43 AM.png](assets/Screenshot_2023-03-27_at_1.35.43_AM.png)

![Screenshot 2023-03-27 at 1.35.49 AM.png](assets/Screenshot_2023-03-27_at_1.35.49_AM.png)



## To run

To run this project locally, follow these steps:

1. Clone the repository
2. Navigate to the **`backend`** directory and run **`npm install`** to install the required dependencies.
3. Comment out these lines since they are for serverless backend.

```javascript
let corsOptions = {
    origin: 'https://chatdodge-ko.pages.dev',
    credentials: true
}
app.use(cors(corsOptions));

module.exports.handler = serverless(app);
```

4. Un - comment `app.listen(3000)`
5. Put your openAI API Key
6. Run the command **`npm start`** to start the backend server.
7. Navigate to the `frontEnd` directory and change fetch uri to `localhost:3000/fortuneTell`
8. Go-Live with frontend index.html

## Frontend Architecture

Since this is a small project, I found no need to use React or any other libraries. I used plain HTML, CSS and Javascript to program the index.html. Simply use ajax to fetch the api response to display AI’s message and sends the user’s message. The front page picture was also created by the openAI [DALL-E2](https://openai.com/product/dall-e-2). A developer [Lonus](https://github.com/Aerglonus) kindly enhanced the design and organized the files.

## Backend Architecture

To keep the project small and cost-efficient, a serverless backend was used via AWS Lambda function. Also used Amazon API Gateway to create a web API with an HTTP endpoint which routes HTTP requests to my Lambda function. Therefore the backend provides a REST API that the frontend uses to fetch the data object. The serverless framework used was Serverless-http.

[Learn more about AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)

[Learn more about using AWS Lambda with Amazon API Gateway](https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html)

## Deployment

### Frontend Deployment

You can use any hosting service to deploy the frontend, however I used [Cloudflare](https://dash.cloudflare.com/) to host my frontend.

1. Create a new Cloudflare account
2. Click `Pages` or go to dashboard
3. Create new page and upload the `frontend` directory

### Backend Deployment

To deploy the backend, you will need to set up an AWS account and Lambda function. Follow these steps:

1. Create a new Lambda function.
2. Upload the **`backend`** directory to the Lambda function.
3. Set up an API Gateway to link the Lambda function to the frontend.
4. Deploy the API Gateway.


# Future Improvement 
- [x] Make a seperate css and js file from index.html
- [ ] Add Google AdSense for monetization
- [ ] Make the frontend / UI better with frameworks
- [ ] Support multi-languages 
    - Korean
    - Spanish 
- [ ] Make light theme and dark theme mode
- [ ] Reject/Alert if user put incorrect birthdate (example, born in the future)
- [ ] Go back button/feature 
- [ ] Add Minutes to the time select for more percise prediction 

# Interesting test cases :

Weird Test case 1: 

![Screenshot 2023-03-27 at 12.31.44 AM.png](assets/Screenshot_2023-03-27_at_12.31.44_AM.png)

![Screenshot 2023-03-27 at 12.31.47 AM.png](assets/Screenshot_2023-03-27_at_12.31.47_AM.png)

The AI tries to deny its given name. 

## **Disclaimer**

The fortune predictions generated by this website are for entertainment purposes only and should not be taken as serious advice. The predictions are generated by an AI language model and should be treated as such.

## **Contributing**

If you want to contribute to this project, please create a pull request to develop branch with your changes.

- Thank you for the Contribution: [Lonus](https://github.com/Aerglonus) 
    - [Link To PR](https://github.com/binyoon99/chatGPT3.5-fortuneTelling-AI/pull/1)

## **License**

This project is licensed under the ISC license. See the LICENSE file for more information.

## **Acknowledgments**

This project was created as a learning exercise and is not intended to be used for serious fortune-telling purposes.
