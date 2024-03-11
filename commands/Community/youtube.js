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
    .addStringOption(option => option.setName('video-id').setDescription('The ID of the video you want to view.').setRequired(true)),
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
            const link = output.data.formats[1].url;
            const itagToFind = 140;

             // Iterate through the "formats" array to find the matching "I-tag" value
             const matchingItem = output.data.adaptiveFormats.find(item => item['itag'] === itagToFind);
         
             if (matchingItem) {
               const urlValue = matchingItem.URL;
               console.log(`URL for itag 140: ${matchingItem.url}`);
             } else {
               console.log('itag 140 not found in the data');
             }

            const link1 = matchingItem.url;
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

            const input2 = {
                method: 'POST',
                url: 'https://url-shortener23.p.rapidapi.com/shorten',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'HIDDEN',
                    'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com'
                },
                data: {
                    url: link1,
                    alias: ''
                }
            };
            
            const output1 = await axios.request(input1);
            const output2 = await axios.request(input2);

            urlLink = 'https://www.youtube.com/watch?v=' + vidId;

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel(`📥 Download Video`)
                .setStyle(ButtonStyle.Link)
                .setURL(output1.data.short_url)
            )
            .addComponents(
                new ButtonBuilder()
                .setLabel(`🔊 Download Audio`)
                .setStyle(ButtonStyle.Link)
                .setURL(output2.data.short_url)
            );

            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle(`**${output.data.title}**`)
            .setURL(urlLink)
            .setAuthor({ name: 'JS Handler', iconURL: 'https://github.com/Derisorant/DBAssets/blob/main/Embed/Profile.png?raw=true' })
            .setDescription(`**Posted by ${output.data.channelTitle}**`)
            .addFields(
                { name: 'Video Length', value: `${output.data.lengthSeconds + ' seconds' } `, inline: true },
                { name: 'View Count', value: `${output.data.viewCount.toString() + ' views'}`, inline: true },
            )
            .setImage(output.data.thumbnail[1].url)
            await interaction.editReply({ embeds: [embed], components: [button] });
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: `That video ID is not valid!`})
        }

    }
}