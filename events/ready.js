const { Events, Guild } = require("discord.js");
require("dotenv").config();

let generalId;
let guildId = process.env.guildId; // Replace with your guild ID
let guild;

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(client, generalId) {
    rl.question("What do you want to send to the channel? \n", (answer) => {
        // Get the channel
        const channel = client.channels.cache.get(generalId);
        if (!channel) {
            console.log("Channel not found!");
            process.exit(1);
        }

        // Send the message to the channel
        channel
            .send(answer)
            .then(() => {
                console.log("Message sent!");
                askQuestion(client, generalId); // Ask the next question
            })
            .catch(console.error);
    });
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    generalId: generalId,
    guild: guild,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity("Valorant Tracker, the ultimate companion for every dedicated agent! 🎮🔥");

        guild = client.guilds.cache.get(guildId);
        if (!guild) {
            console.log("Guild not found!");
            process.exit(1);
        }

        // Find the general channel ID
        const regexChat = /general/i;
        guild.channels.cache.forEach((channel) => {
            if (regexChat.test(channel.name)) {
                generalId = channel.id;
            }
        });
        console.log(`General channel ID: ${generalId}`);

        // Ask the first question
        askQuestion(client, generalId);
    },
};
