const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('GVRP | Session Startup')
            .setDescription(` <@${interaction.user.id}> started a session! Are you guys ready to start the session? Kindly make sure to check out <#1268920922585174149> for important information before participating.

                **__Session rules__** 
                > Follow all the rules provided by the host.
                > Leaking the session would result in a server punishment.
                > Failing to roleplay proper would result in a server punishment.`)
            .setImage('https://cdn.discordapp.com/attachments/1268920932983111690/1269002155440738314/Server_Information_1.png?ex=66ae79da&is=66ad285a&hm=6bd65963816c12a9e58eea0512885024e0443a1dc1ef7c405937737b032d3ec5&')
            .setFooter({
                text: 'Greenville Roleplay Phase',
                iconURL: 'https://cdn.discordapp.com/icons/980909397461065848/869f511ea9b177b668fba278eef40e5e.png?size=4096'
            });

        const message = await interaction.channel.send({
            content: '@everyone',
            embeds: [embed]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has started up a session in <#1268920429746061393>`)
            .setFooter({
                text: 'Greenville Roleplay Phase',
                iconURL: 'https://cdn.discordapp.com/icons/980909397461065848/869f511ea9b177b668fba278eef40e5e.png?size=4096'
            });

        const targetChannel = await interaction.client.channels.fetch('1268998427644002305');
        await targetChannel.send({ embeds: [newEmbed] });

        const filter = (reaction, user) => reaction.emoji.name === '✅';

        const collector = message.createReactionCollector({ filter, time: 86400000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!')
                    .setFooter({
                        text: 'Greenville Roleplay Phase',
                        iconURL: 'https://cdn.discordapp.com/icons/980909397461065848/869f511ea9b177b668fba278eef40e5e.png?size=4096'
                    });

                interaction.channel.send({ embeds: [settingUpEmbed] });
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });

        await interaction.reply({ content: `Message has been sent below.`, ephemeral: true });
    },
};
