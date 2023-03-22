const socket = io()

let userName;
let messageContent = document.querySelector('#message');
let chatArea = document.querySelector('.chatbox')
const element = document.getElementById("submit");
var audio = new Audio('notification.mp3');
var msgAudio = new Audio('text_message.mp3');

// To get the username
do{
    userName = prompt("Enter your username : " );
    joinedChat(userName);
}while(!userName);

socket.emit('newUserJoined',userName);

function joinedChat(userName){
    let joinDiv = document.createElement('div');
    let joinText = `
    <p class="joinedText">You(${userName}) joined the chat</p>
    `;
    joinDiv.innerHTML = joinText;
    chatArea.appendChild(joinDiv);
}

console.log(`${userName} connected!`);
// enter to send; e here signifies the event
// messageContent.addEventListener('keyup',function(event){
//     if(event.keyCode == 13){
//         event.preventDefault();
//         btnClick();
//     }
// });

socket.on('userjoined', name =>{
    let joinDiv = document.createElement('div');
    let joinText = `
    <p class="joinedText">You(${name}) joined the chat</p>
    `;
    joinDiv.innerHTML = joinText;
    chatArea.appendChild(joinDiv);
})

function handleKeyPress(event) {
    if (event.keyCode === 13) { // 13 is the code for the Enter key
      event.preventDefault(); // prevent the default behavior of adding a new line
      // set the value of the text area to an empty string
      btnClick();
    }
  }

function btnClick(){
    var textMessage = document.getElementById('message').value;
    sendMessage(textMessage);
}
// element.addEventListener("click", sendMessage(textMessage));

// message send logic

function sendMessage(message){
    let msg = {
        user : userName,
        message: message
    }
    console.log("sendMessage actiavted")
    //append --> to make the message go to the server

    appendMessage(msg,'right')

    // message to server

    socket.emit('message', msg)
}

function appendMessage(msg, type){
    console.log("Append Activated")
    let msgDiv = document.createElement('div');
    
    let className = type;

    msgDiv.classList.add(className,'chat')

    console.log(msgDiv);
    let markup = `
        <h4>me</h4>
        <p class="msg">${msg.message}</p>
    `;
    console.log(`${msg.user}---${msg.message}`)
    
   

    msgDiv.innerHTML = markup;
    chatArea.appendChild(msgDiv);
    document.getElementById("message").value = "";
    scrollToCurrentMsg()
}

function appendMessageOut(msg, type){
    console.log("Append Activated")
    msgAudio.play();
    let msgDiv = document.createElement('div');

    let className = type;

    msgDiv.classList.add(className,'chat')

    console.log(msgDiv);
    let markup = `
        <h4>${msg.user}</h4>
        <p class="msg">${msg.message}</p>
    `;

    console.log(`${msg.user}---${msg.message}`)

    msgDiv.innerHTML = markup;
    chatArea.appendChild(msgDiv);
    document.getElementById("message").value = "";
    scrollToCurrentMsg()
}

// receiving messages

socket.on('message',(msg)=>{
    console.log(msg);
    appendMessageOut(msg,'left')
})

socket.on('userJoined',(name)=>{
    console.log(name);
    let joinDiv = document.createElement('div');
    let joinText = `
    <p class="joinedText">${name} joined the chat</p>
    `;
    joinDiv.innerHTML = joinText;
    chatArea.appendChild(joinDiv);
    audio.play();
})


function scrollToCurrentMsg(){
    chatArea.scrollTop=chatArea.scrollHeight
}

// remove policy 

function removePolicy(){
    var poli= document.getElementById('policy');
    poli.remove();
}