const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Check if the interaction is a ButtonInteraction
        if (!(interaction instanceof ButtonInteraction)) return;

        // Check if the custom ID matches the session ping button
        if (interaction.customId === 'startup') {
            // Check if the member already has the session role
            const hasRole = interaction.member.roles.cache.has('1269013632222756864');

            try {
                if (!hasRole) {
                    await interaction.member.roles.add('1269013632222756864'); // Add session role
                    await interaction.reply({
                        content: 'You have been granted the <@&1269013632222756864> role.',
                        ephemeral: true
                    });
                } else {
                    await interaction.member.roles.remove('1269013632222756864'); // Remove session role
                    await interaction.reply({
                        content: 'The <@&1269013632222756864> role has been removed from you.',
                        ephemeral: true
                    });
                }
            } catch (error) {
                console.error('Error handling interaction:', error);
                await interaction.reply({
                    content: 'There was an error while processing your request.',
                    ephemeral: true
                });
            }
        }
    },
};
