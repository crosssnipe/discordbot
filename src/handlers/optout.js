import * as utils from '../managers/common.js';

export async function handleOptOut(interaction, env) {
    const user = interaction.member?.user;
    let user_data = await utils.get_user_data(user, env);
    if (await utils.opted_in(user_data) === false) {
        let content = `You have already opted out of CrossSnipes.`;
        return utils.get_json_response(content, true);
    }

    user_data.opted_in = false; // Set opted_in to false
    await env.SNIPE_DATA.put(user.id, JSON.stringify(user_data));
    let content = `You have successfully opted out of CrossSnipes. You will no longer be able to snipe or be targeted. To opt back in, please contact a moderator.`;
    return utils.get_json_response(content, true);
}