const { SlashCommandBuilder } = require('discord.js');
const info = require("../../Information/info");

const name = info.array.map((value) => {
    return value.name.toString()
})

const description = info.array.map((value) => {
    return value.description.toString()
})

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
let startTime = new Date();


module.exports = {
	data: new SlashCommandBuilder()
		.setName(name[2])
		.setDescription(description[2]),
	async execute(interaction) {
		let endTime = new Date();
		let timeElapsed = endTime - startTime;

		// Labelling for individual integer specifications
		let seconds = Math.floor((timeElapsed / 1000) % 60).toString();
		let minutes = Math.floor((timeElapsed / 1000 / 60) % 60).toString();
		let hours = Math.floor((timeElapsed / 1000 / 60 / 60) % 24).toString();
		let days = Math.floor((timeElapsed / 1000 / 60 / 60 / 24)).toString();
		
		// If statements for checking if interger > 0
		// Seconds
		if (seconds > 1) {
			seconds = ' ' + Math.floor((timeElapsed / 1000) % 60).toString() + " seconds";
		} else {
			seconds = ' 1 second';
		}

		// Minutes
		if (minutes == 0 ) {
			minutes = '';
		} else if (minutes == 1) {
			minutes = ' ' + Math.floor((timeElapsed / 1000 / 60) % 60).toString() + " minute and";
		} else {
			minutes = ' ' + Math.floor((timeElapsed / 1000 / 60) % 60).toString() + " minutes and";
		}

		// Hours
		if (hours == 0) {
			hours = '';
		} else if (hours == 1) {
			hours = ' ' + Math.floor((timeElapsed / 1000 / 60 / 60) % 24).toString() + " hour,";
		} else {
			hours = ' ' + Math.floor((timeElapsed / 1000 / 60 / 60) % 24).toString() + " hours,";
		}

		// Days
		if (days == 0) {
			days = '';
		} else if (days == 1) {
			days = ' ' + Math.floor((timeElapsed / 1000 / 60 / 60 / 24)).toString() + " day,";
		} else {
			days = ' ' + Math.floor((timeElapsed / 1000 / 60 / 60 / 24)).toString() + " days,";
		}
		await interaction.reply("The bot has been running for" + days + hours + minutes + seconds);
	},
};
