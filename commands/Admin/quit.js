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
		.setName(name[4])
		.setDescription(description[4]),
	async execute(interaction) {

        // Only allow a specific user ID to run command
        const yourUserId = '513078954673045534';
        const userIsYou = interaction.user.id === yourUserId;

        if (!userIsYou) {
            // Deny any other user ID'S
            await interaction.reply("You are not authorized to use this command.");
            return;
        }
		
		await interaction.reply('Quitting');
        await process.exit();
	},
};