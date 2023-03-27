const chatBox = document.querySelector(".chat-box");
let userMessages = [];
let assistantMessages = [];
let myDateTime = "";

function spinner() {
  document.getElementById("loader").style.display = "block";
}

function start() {
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value;
  if (date === "") {
    alert("Please enter your date of birth");
    return;
  }
  myDateTime = date + hour;

  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

const chatInput = document.querySelector(".chat-input input");
chatInput.addEventListener("keypress", inputKeyPress);

function inputKeyPress(event) {
  if (event.keyCode === 13) {
    spinner();
    sendMessage();
  }
}

const sendMessage = async () => {
  const chatInput = document.querySelector(".chat-input input");
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.innerHTML = `
    <p>${chatInput.value}</p>
  `;

  chatBox.appendChild(chatMessage);

  //userMessage 메세지 추가
  userMessages.push(chatInput.value);

  chatInput.value = "";

  const response = await fetch(
    "https://6kwoidolpj.execute-api.us-east-2.amazonaws.com/prod/fortuneTell",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myDateTime: myDateTime,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      }),
    },
  );

  const data = await response.json();
  document.getElementById("loader").style.display = "none";

  //assistantMessage 메세지 추가
  assistantMessages.push(data.assistant);

  const astrologerMessage = document.createElement("div");
  astrologerMessage.classList.add("chat-message");
  astrologerMessage.innerHTML = `<div class='assistant'>
  <img src="./assets/images/chatdoge.png" />
  <p>${data.assistant} </p>
  </div>

  `;
  chatBox.appendChild(astrologerMessage);
};

document
  .querySelector(".chat-input button")
  .addEventListener("click", sendMessage);