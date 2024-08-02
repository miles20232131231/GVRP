const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('information')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const channel = interaction.client.channels.cache.get('1267132877393498247');
        if (!channel) {
            return interaction.reply({ content: 'Channel not found!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('GVRP | Session Startup')
            .setDescription(`**__Server Rules__**
                1.**__No stealing assets__**
                Stealing assets or any other plagiarism from the GVRP is strictly not allowed, doing so would result in a server ban and server blacklist from GVRP.
                
                2.**__No slurs__**
                If you are caught doing racial slurs or trying to bypass the slur system, you will be banned and there will be no ban appeal.
                
                3.**__Doxxing personal information__**
                Leaking any personal information would result in a server ban due to this being strictly not allowed.
                
                4.**__Report Issues__**
                When you encounter any issues, open a ticket and report it to HR so it may be fixed as soon as possible.
                
                5.**__Exploiting__**
                If you are caught exploiting you would be reported to Discord and Roblox and banned from GVRP.
                
                6.**__Behavior__**
                Avoid any actions that may cause fights in sessions and main channels.
                
                7.**__Pinging__**
                Massive pinging is not allowed; if caught doing so, it would result in a server mute from our moderation system.
                
                8.**__Common sense__**
                Common sense is needed on the server; failing to have it while in the server would result in a server kick.
                
                9.**__Advertising__**
                Advertising is not allowed; if caught doing so, our moderation system will punish you appropriately.
                
                10.**__Asking for sessions__**
                Asking for any sessions would result in a server mute, as the staff members host when they have the time to do so.`)
            .setColor('#5F8CE1')
            .setImage('https://cdn.discordapp.com/attachments/1267132877393498247/1268997503265669141/Server_Information.png?ex=66ae7585&is=66ad2405&hm=aaaf43b594a0c7b560e1e580d6aa216ec2ec6798c135b7562eca9a6bcbfc711d&')
            .setFooter({
                text: 'Greenville Roleplay Phase',
                iconURL: 'https://cdn.discordapp.com/icons/980909397461065848/869f511ea9b177b668fba278eef40e5e.png?size=4096'
            });

        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Information embed sent successfully.', ephemeral: true });
    },
};
