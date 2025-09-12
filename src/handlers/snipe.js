import { SnipeManager } from '../managers/snipe_manager.js';
import { MsgManager } from '../managers/msg_manager.js';
import * as utils from '../managers/common.js';



export async function handleSnipe(interaction, env) {

    const snipeManager = new SnipeManager(env);
    const msgManager = new MsgManager();

    const user = interaction.member?.user;

    const sniper_data = await utils.get_user_data(user, env); // json object for sniper
    if (!await utils.opted_in(sniper_data)) {
        let response = `You have opted out of CrossSnipes. Please contact a moderator to opt you back in.`;
        return utils.get_json_response(response, true);
    }
    const targets_data = new Map();
    for (const user of Object.values(interaction.data.resolved?.users)) {
        let user_data = await utils.get_user_data(user, env);
        if (!await utils.opted_in(user_data)) {
            let response = `User <@${user.id}> has not opted in to CrossSnipes. They cannot be targeted. Please delete your photo.`;
            return utils.get_json_response(response, true);
        }
        targets_data.set(user.id, user_data);
    }
    const pts_data = await snipeManager.log_snipe(user.id, sniper_data, targets_data);
    const target_msg = msgManager.get_target_msg(targets_data);
    const szn_msg = "";  
    const SNIPE_RESPONSE = `${target_msg} \n${szn_msg} **+${pts_data.pts_earned}** points\nYou now have **${pts_data.total_pts}** Points! `;


    return utils.get_json_response(SNIPE_RESPONSE, false);
}