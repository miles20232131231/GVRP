const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cohost')
        .setDescription('Sends a cohost embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('GVRP | Cohost')
            .setDescription(`<@${interaction.user.id}> is cohosting the session being hosted`)
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
            .setTitle("Cohost")
            .setDescription(`<@${interaction.user.id}> has is cohosting the session being hosted.`)
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
                    .setDescription('Cohost')
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
