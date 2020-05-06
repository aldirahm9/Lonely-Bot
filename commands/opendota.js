const Discord = require(`discord.js`);

module.exports = {
	name: 'opendota',
    description: 'Webscrape Opendota',
    args: true,
    usage: `<hero name>`,
    cooldown: 5,
	execute(message, args) {

        // Sends them a embed with the information about the hero
        const embed = new Discord.MessageEmbed()

            // Colour of background
            .setColor('#0099ff')

            // Text in blue (ideally hero name)
            .setTitle(args[0])

            // Link when the click on the title
            .setURL('https://discord.js.org/')

            // The thing at the very top of the embed
            .setAuthor('Lonely Bot', 'https://i.imgur.com/tFUPkxM.png', 'https://discord.js.org')

            // Information that comes underneath the hero name
            .setDescription('Some description here')

            // Lower thumbnail
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

            message.channel.send(embed);

            // Sends them a message at the bottom
        return message.channel.send(`Webscaping data not implemented yet.`);
	},
};