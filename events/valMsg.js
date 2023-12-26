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
        
                switch (randomNumber) {
                    case 1:
                        message.reply('https://cdn.discordapp.com/attachments/508827545890717696/1188376531702136868/artwork.png?ex=659a4ce4&is=6587d7e4&hm=70fd084f319c5222dccc79f2351fdd82523e26b00fae05f2057572b41bbf0ecc&');
                        break;
                    case 2:
                        message.reply('https://cdn.discordapp.com/attachments/808932976125149225/1188376920451186718/images.png?ex=659a4d40&is=6587d840&hm=a1bd7d6dd8ecf850527b681bc09221a4d0ab8850172e04b050808d3f1abcdc3a&');
                        break;
                    case 3:
                        message.reply('https://cdn.discordapp.com/attachments/808932976125149225/1188376973135851550/sweet_relief___3_by_slimepope_dfyk73e-350t.png?ex=659a4d4d&is=6587d84d&hm=759db659688f00da649ca29718fb935ff960a1c443e454fd4f06a780b6c334a3&');
                        break;
                    case 4:
                        message.reply('https://cdn.discordapp.com/attachments/808932976125149225/1188377052957642784/ajcfj91wmalb1.png?ex=659a4d60&is=6587d860&hm=2619da327a3cd6b4901f75c0647dc9f88ad04109041fbc851ab420b6da4ea11a&');
                        break;
                }
            }
	},
};





