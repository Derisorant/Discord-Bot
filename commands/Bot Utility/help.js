const { SlashCommandBuilder, EmbedBuilder, EmbedAssertions, User } = require('discord.js');
const info = require("../../Information/info");

const name = info.array.map((value) => {
    return value.name.toString()
})

const description = info.array.map((value) => {
    return value.description.toString()
})

const cmdName = info.array.map((value) => {
    return '/' + value.name.toString()
})

const embed = new EmbedBuilder()
    .setColor('Blurple')
    .setAuthor({ name: 'JS Handler', iconURL: 'https://github.com/Derisorant/DBAssets/blob/main/Embed/Profile.png?raw=true', url: 'https://github.com/Derisorant' })
    .setDescription('This is the help page for JS Handler')
    .addFields(
        { name: '\u200B', value: '**🫂 Community**' },
        { name: cmdName[2], value: description[2], inline: true },
        { name: cmdName[6], value: description[6], inline: true },
    )
    .addFields(
        { name: '\u200B', value: '**⚙️ Bot Utility**' },
        { name: cmdName[0], value: description[0], inline: true },
    )
    .addFields(
        { name: '\u200B', value: '**🔒 Admin**' },
        { name: cmdName[3], value: description[3], inline: true },
        { name: cmdName[4], value: description[4], inline: true },
        { name: cmdName[5], value: description[5], inline: true },
        { name: cmdName[7], value: description[7], inline: true },
    )
    .addFields(
        { name: '\u200B', value: '**📖 Other**' },
        { name: cmdName[1], value: description[1], inline: true },
    )
    .setFooter({ text: '- Dante' })


module.exports = {
    data: new SlashCommandBuilder()
        .setName(name[0])
        .setDescription(description[0]),
    async execute(interaction) {
        await interaction.reply({ embeds: [embed] });
    }
};
