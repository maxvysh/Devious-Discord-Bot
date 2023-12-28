require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('defcon1')
        .setDescription('INITIALIZE DEFCON 1'),
    async execute(interaction) {
        if (interaction.member.id == process.env.ownerId) {
            // It joins the vc and starts blasting an air raid siren
            const channel = interaction.member.voice.channel;

            if (!channel) {
                await interaction.reply('You must be in a voice channel to use this command.');
                return;
            }

            const connection = await joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(fs.createReadStream('./airraid.webm'));

            await player.play(resource);
            await connection.subscribe(player);

            // Counting down from 10 to 0, the bot changes its nickname to the current number
            // const bot = interaction.guild.members.cache.get(process.env.clientId); 
            let count = 10;
            const textChannel = interaction.channel;
            const interval = setInterval(async () => {
                if (count > 0) {
                    // bot.setNickname(count.toString()); --Scrapped the nickname idea because it would get rate limited
                    // Type 'count' in the chat channel that the command was typed in
                    await textChannel.send(count.toString());
                    count--;
                }
                else {
                    await console.log('Countdown complete');
                    textChannel.send('https://tenor.com/view/we-do-a-little-trolling-trolling-shockwave-nuke-nuclear-explosion-gif-21948424');
                    // It deletes all the voice channels
                    interaction.guild.channels.cache.forEach((channel) => {
                        if (channel.type == 2) {
                            channel.delete();
                        }
                    });
                    clearInterval(interval);
                }
            }, 1000);

            interaction.reply('ƪ(˘⌣˘)ʃ');
        }
        else {
            await interaction.reply('Enter the passcode');
            // Create an event listener for messages
            // Create a message collector
            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 10000 });

            collector.on('collect', m => {
                console.log(`Collected ${m.content}`);
                collector.stop();
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
                interaction.channel.send('Wrong');
            });
        }
    },
};