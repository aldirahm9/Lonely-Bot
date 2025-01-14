const User = require('../database/user');

module.exports = {
  name: 'steamid',
  description: 'Link your current Discord ID to your Steam ID',
  information: 'Stores or updates your steam ID (it should consist of only numbers and be the number that you see as your steam friend id or in your steam URL, or the number at the end of your dotabuff/ opendota URL). Once your steam ID is saved, you do not need to type your steamID the next time you use the opendota command. If you would like to remove your steamID info from the database, you can use `steamid 0`',
  aliases: false,
  args: true,
  usage: '[Steam32 ID]',
  example: '193480093',
  cooldown: 1,
  category: 'dota',
  execute (message, args) {
    const discordID = message.author.id;
    const steamID = args[0];

    const query = { discordID: discordID };
    const update = { steamID: steamID };
    const options = { returnNewDocument: true };

    // Remove steamID from the database
    if (steamID === '0') {
      User.remove(query)
        .then(() => {
          message.channel.send('Successfully removed steamID from database.');
        })
        .catch(err => message.channel.send(`${message.author} Failed to find and remove steamID ${err}`));
      return;
    }

    // Basic check if the steamID is valid
    if (isNaN(steamID) || isNaN(parseInt(steamID))) {
      message.channel.send(`${message.author} Invalid steamID. It should only consist of numbers`);
      return;
    }

    // Update the steamID in the database
    User.findOneAndUpdate(query, update, options)
      .then(updatedDocument => {
        if (updatedDocument) {
          message.channel.send(`${message.author} Successfully updated Steam ID to be **${steamID}**`);
        } else {
          const newUser = new User({ discordID, steamID });
          newUser.save()
            .then(() => {
              message.channel.send(`${message.author} Added Steam ID to be **${steamID}**`);
            })
            .catch(err => message.channel.send('Error: ' + err));
        }
      })
      .catch(err => message.channel.send(`${message.author} Failed to find and add/ update ID. ${err}`));
  }
};
