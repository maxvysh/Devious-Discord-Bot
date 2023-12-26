const { Events } = require('discord.js');
require('dotenv').config();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(client, generalId) {
    rl.question('What do you want to send to the channel? \n', (answer) => {
        // Get the channel
        const channel = client.channels.cache.get(generalId);
        if (!channel) {
            console.log('Channel not found!');
            process.exit(1);
        }

        // Send the message to the channel
        channel.send(answer)
            .then(() => {
                console.log('Message sent!');
                askQuestion(client, generalId); // Ask the next question
            })
            .catch(console.error);
    });
}

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        // Print out all the channels the bot is in
        // console.log('Channels:');
        // client.channels.cache.forEach(channel => {
        //     console.log(` - ${channel.name} (${channel.type}) - ${channel.id}`);
        // });

        let generalId;
        const regex = /general/i;
        client.channels.cache.forEach(channel => {
            if (regex.test(channel.name)) {
                generalId = channel.id;
            }
        });
        console.log(`General channel ID: ${generalId}`);

        // Ask the first question
        askQuestion(client, generalId);
	},
};