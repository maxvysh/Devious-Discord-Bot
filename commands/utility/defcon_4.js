const { SlashCommandBuilder } = require('discord.js');
const regexGame = /valorant/i;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('defcon4')
		.setDescription('INITILIZE DEFCON 4'),
	async execute(interaction) {
        const guild = interaction.guild;

		// Define a string that will later tag everyone and say stop playing valorant
        let message = "";
        let count = 0;

        // For every member in guildId
        guild.members.cache.forEach((member) => {
            // For the size of the activities array print out the names of the activities
            if (member.presence !== null && member.presence.activities) {
                for (let i = 0; i < member.presence.activities.length; i++) {
                    console.log(
                        `Name: ${member.user.username} ${member.presence.activities[i].name}`
                    );
                    if (regexGame.test(member.presence.activities[i].name)) {
                        // @ the user in general chat and tell them to stop playing valorant
                        message += `<@${member.id}> `;
                        count++;
                    }
                }
            }
        });
        if (count > 0) {
            message += "stop playing that dogshit.";
            await interaction.reply(message);
        }
		else {
			await interaction.reply("We good, no is playing that dogshit.");
		}
	},
};