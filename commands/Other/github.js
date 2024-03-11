const { SlashCommandBuilder } = require('discord.js');
const info = require("../../Information/info");

const name = info.array.map((value) => {
    return value.name.toString()
})

const description = info.array.map((value) => {
    return value.description.toString()
})


module.exports = {
	data: new SlashCommandBuilder()
		.setName(name[1])
		.setDescription(description[1]),
	async execute(interaction) {
		const channel = interaction.channel;
		await interaction.reply('https://github.com/derisorant');
	},
};