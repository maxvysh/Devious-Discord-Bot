const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('muteme')
		.setDescription('Mutes the user in whichever voice channel he is in'),
	async execute(interaction) {
        const member = interaction.member;

        if (member.voice.channel) {
            const channel = member.voice.channel;
            for (const [memberID, member] of channel.members) {
                if (memberID === interaction.member.id) {
                    member.voice.setMute(true);
                    await interaction.reply("You have been muted.");
                }
            }
        }
	},
};