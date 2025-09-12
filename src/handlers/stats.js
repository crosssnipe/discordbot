import * as utils from '../managers/common.js';

export async function handleStats(interaction, env) {

    const userId = interaction.data?.options?.find(o => o.name === 'user')?.value;
    const target = interaction.data?.resolved?.users?.[userId] || interaction.member?.user;      
    let user_data = await utils.get_user_data(target, env);

    if (!user_data) {
        return utils.get_json_response(`No data found for user <@${target.id}>.`, true);
    }

    if (!await utils.opted_in(user_data)) {
        let STATS_RESPONSE = `User <@${target.id}> has not opted in to CrossSnipes.`;
        return utils.get_json_response(STATS_RESPONSE, true);
    }

    const outCount = user_data.out || 0;
    const inCount = user_data.in || 0;
    const totalPoints = user_data.pts || 0;
    const displayName = interaction.member?.nick || target.global_name || target.username || 'Unknown User'; // Use nick, global_name, or username (only for bots)

    const STATS_RESPONSE = 
    `**${displayName}'s Snipe Stats**
:dart: Times targeted: **${inCount}**
:gun: Snipes: **${outCount}**
:moneybag: Points: **${totalPoints}**`;

    return utils.get_json_response(STATS_RESPONSE, true);
}