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
        .setName(name[5])
        .setDescription(description[5]),
    async execute(interaction, message) {
        // Only allow a specific user ID to run command
        const yourUserId = '513078954673045534';
        const userIsYou = interaction.user.id === yourUserId;

        if (!userIsYou) {
            // Deny any other user ID'S
            await interaction.reply("You are not authorized to use this command.");
            return;
        }

        // If the user ID is correct, proceed
        const channel = interaction.channel;
        await interaction.reply("Deleting...");
        
        // Simulate a delay of 1 second
        var delayInMilliseconds = 1000;
        setTimeout(function () {
            // Bulk delete the last 11 messages (including the command itself)
            channel.bulkDelete(11);
        }, delayInMilliseconds);
    },
};