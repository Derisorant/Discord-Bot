const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
const info = require("../../Information/info");

const name = info.array.map((value) => {
    return value.name.toString()
})

const description = info.array.map((value) => {
    return value.description.toString()
})

module.exports = {
    data: new SlashCommandBuilder()
    .setName(name[6])
    .setDescription(description[6])
    .addStringOption(option => option.setName('video-id').setDescription('The Youtube Video ID you want to download').setRequired(true)),
    async execute(interaction) {
        
        await interaction.deferReply({ ephemeral: false });

        const { options } = interaction;
        const vidId = options.getString('video-id');

        const input = {
            method: 'GET',
            url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
            params: { id: vidId },
            headers: {
                'X-RapidAPI-Key': 'HIDDEN',
                'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
            }
        };
    
        try {
            const output = await axios.request(input);
            const link = output.data.formats[2].url;
            const input1 = {
                method: 'POST',
                url: 'https://url-shortener23.p.rapidapi.com/shorten',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'HIDDEN',
                    'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com'
                },
                data: {
                    url: link,
                    alias: ''
                }
            };

            const output1 = await axios.request(input1);
            const link1 = link;

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel(`📥 Download`)
                .setStyle(ButtonStyle.Link)
                .setURL(output1.data.short_url)
            );

            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`💾 Download the mp4 of \`${output.data.title}\` below`)
            .setImage(output.data.thumbnail[1].url)
            await interaction.editReply({ embeds: [embed], components: [button] });
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: `That video ID is not valid!`})
        }

    }
}