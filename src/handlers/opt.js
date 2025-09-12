import * as utils from '../managers/common.js';

export async function handleOpt(interaction, env) {
    const userId = interaction.data?.options?.find(o => o.name === 'user')?.value;
    const user = interaction.data?.resolved?.users?.[userId];
    let user_data = await utils.get_user_data(user, env);
    
    const mode = interaction.data?.options?.find(o => o.name === 'mode')?.value;
    const set_opt = mode === 'in'; // Set opted_in based on mode (true for 'in', false for 'out')

    if (user_data.opted_in === set_opt) {
        let content = `User <@${user.id}> is already opted ${mode} of CrossSnipes.`;
        return utils.get_json_response(content, true);
    }

    user_data.opted_in = set_opt; // Update opted_in status
    await utils.save_user_data(user, user_data, env);
    let content = `Successfully opted <@${user.id}> ${mode} ${set_opt ? 'to' : 'of' } CrossSnipes.`;
    return utils.get_json_response(content, true);
}