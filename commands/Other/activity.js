const { SlashCommandBuilder, EmbedBuilder, Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const info = require("../../Information/info");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('../../config.json');


const name = info.array.map((value) => {
    return value.name.toString()
})

const description = info.array.map((value) => {
    return value.description.toString()
})

module.exports = {
    data: new SlashCommandBuilder()
        .setName(name[7])
        .setDescription(description[7])
        .addStringOption(option => option.setName('name').setDescription('The name of the Activity').setRequired(true)),

    async execute(interaction) {

        // Only allow a specific user ID to run command
        const yourUserId = '513078954673045534'; 
        const userIsYou = interaction.user.id === yourUserId;

        if (!userIsYou) {
            // Deny any other user ID'S
            await interaction.reply("You are not authorized to use this command.");
            return;
        }

        const { options } = interaction;
        exports.activity = options.getString('name');

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`🔧 Updating the bot Activity to \`${exports.activity}\``)

        await interaction.reply({ embeds: [embed] });

        if (exports.activity == undefined) {
            client.user.setActivity('/Help', {
                type: ActivityType.Listening
            })
        } else {
            client.user.setActivity(exports.activity + ' | /Help', {
                type: ActivityType.Listening
            }),
                console.log(`User has changed the bot status to ${exports.activity}`)
        };
    },
};



// client.on('ready', (c) => {

//     setInterval(() => {
        
//         if ( this.activity == undefined  ) {
//             client.user.setActivity('/Help', {
//                 type: ActivityType.Listening
//             })
//         } else {
//         client.user.setActivity(this.activity + ' | /Help', {
//             type: ActivityType.Listening
//         }),
//         console.log(`User has changed the bot status to ${this.activity}`)
//     }
//     }, 10000);
// })

client.login(token);

