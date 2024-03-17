const {Client, DMChannel} = require("discord.js-selfbot-v13");
const config = require("./config.json");

const client = new Client();
let names = ["kev", "kevin", "kek", "kekmeister", "meister"];

client.on("messageCreate", (message) => {
    let messageReference = null;
    let validMessage = false;

    if(message.author.bot) return;
    if(message.author.id === client.user.id) return;
    if(message.type === "REPLY"){
        messageReference = message.channel.messages.fetch(message.reference.messageId);
    }

    if(messageReference && messageReference.author.id === client.user.id) validMessage = true;

    for(const name of names){
        if(message.content.toLowerCase().includes(name)) validMessage = true;
    }

    if(message.mentions.users.get(client.user.id)) validMessage = true;
    if(message.channel instanceof DMChannel) validMessage = true;

    console.log(validMessage);
});

client.login(config.token).then(() => {
    console.log("Bot has logged in!")
})
