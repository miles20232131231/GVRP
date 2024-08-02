const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('By using this command you can register you command here.')
        .addIntegerOption(option =>
            option.setName('year')
                .setDescription('Vehicle Year')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('make')
                .setDescription('Vehicle Make')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                .setDescription('Vehicle Model')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Vehicle Color')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('number-plate')
                .setDescription('Vehicle Number Plate')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const year = interaction.options.getInteger('year');
            const make = interaction.options.getString('make');
            const model = interaction.options.getString('model');
            const color = interaction.options.getString('color');
            const numberPlate = interaction.options.getString('number-plate');

            const user = interaction.user.username;

            const embed = new EmbedBuilder()
                .setTitle('Vehicle Registered')
                .setDescription(`<@${interaction.user.id}> has registered their vehicle to the database. The information below is the vehicle information.
                
                **Vehicle Information:**
                
                Owner: <@${interaction.user.id}>
                Year: **${year}**
                Make: **${make}**
                Model: **${model}**
                Color: **${color}**
                Number Plate: **${numberPlate}**`)

            const targetChannel = await interaction.client.channels.fetch('1269007780115644489');
            if (targetChannel.isTextBased()) {
                await targetChannel.send({ embeds: [embed] });
            }

            const confirmationEmbed = new EmbedBuilder()
                .setDescription(` A new vehicle has been registered by <@${interaction.user.id}>. Please navigate to <#1269007780115644489> to view the registration details.`)
                .setFooter({
                    text: 'Greenville Roleplay Phase',
                    iconURL: 'https://cdn.discordapp.com/icons/980909397461065848/869f511ea9b177b668fba278eef40e5e.png?size=4096'
                });

            const confirmationChannel = await interaction.client.channels.fetch('1268998427644002305');
            if (confirmationChannel.isTextBased()) {
                await confirmationChannel.send({ embeds: [confirmationEmbed] });
            }

            await interaction.editReply({ content: 'Vehicle has now been registered successfully. If you would like to view it head over to <#1269007780115644489>', ephemeral: true });
        } catch (error) {
            console.error('Error processing vehicle registration:', error);
            await interaction.editReply({ content: 'There was an error while processing your request.', ephemeral: true });
        }
    },
};
