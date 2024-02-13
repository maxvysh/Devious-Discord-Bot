const { Events } = require('discord.js');


const regex = /\b(val|valorant)\b/i; // \b for word boundary, i flag for case-insensitive matching
let previousRandomNumber = 0;

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
            if (regex.test(message.content)) { //Val or Valorant trigger - sends troll image
                let randomNumber;
                do {
                    randomNumber = Math.floor(Math.random() * 4) + 1;
                } while (randomNumber === previousRandomNumber);
        
                previousRandomNumber = randomNumber;
        
                // Insert your own images here, whenver someone says Val or Valorant, the bot will send a random image from the ones you input
                switch (randomNumber) {
                    case 1:
                        message.reply('');
                        break;
                    case 2:
                        message.reply('');
                        break;
                    case 3:
                        message.reply('');
                        break;
                    case 4:
                        message.reply('');
                        break;
                }
            }
	},
};





