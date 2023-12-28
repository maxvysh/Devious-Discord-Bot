const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lolstats')
        .setDescription('Responds with the stats of a League of Legends player')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The username of the player')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('The tag of the player (leave blank if NA1)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getString('username');
        const tag = interaction.options.getString('tag') || 'NA1';

        let response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}?api_key=${process.env.riotkey}`);
        if (!response.ok) {
            await interaction.editReply('Invalid username or tag');
            return;
        }
        let data = await response.json();
        const puuid = data.puuid;

        response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.riotkey}`);
        data = await response.json();
        const encryptedSummonerId = data.id;
        const profileIconId = data.profileIconId;
        const summonerLevel = data.summonerLevel;
        console.log(puuid);
        console.log(encryptedSummonerId);

        response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.riotkey}`);
        data = await response.json();

        let avgKDA = 0;

        let matchRequests = data.map(matchId => fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.riotkey}`));
        let matchResponses = await Promise.all(matchRequests);
        let matchData = await Promise.all(matchResponses.map(response => response.json()));

        let kda = 0;
        let name;
        for (let i = 0; i < matchData.length; i++) {
            let participant = matchData[i].info.participants.find(p => p.puuid === puuid);
            console.log(participant.challenges.kda);
            kda += participant.challenges.kda;
            if (i == 0) {
                name = participant.riotIdGameName;
            }
        }
        avgKDA = kda / data.length;

        // Round avgKDA to 2 decimal places
        avgKDA = Math.round(avgKDA * 100) / 100;

        // Make an embed with the summoner's name, level, and icon
        const summonerEmbed = new EmbedBuilder()
            .setTitle(name)
            .setDescription(`Level ${summonerLevel}`)
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${profileIconId}.png`)
            .addFields(
                { name: 'Average KDA', value: avgKDA.toString() },
            );

        // Response with the embed
        await interaction.editReply({ embeds: [summonerEmbed] });
    },
};