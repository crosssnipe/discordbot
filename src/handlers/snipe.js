import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { SnipeManager } from '../managers/snipe_manager.js';
import { MsgManager } from '../managers/msg_manager.js';


export async function handleSnipe(interaction, env) {
    const snipeManager = new SnipeManager(env);
    const msgManager = new MsgManager();

    const sniper_data = interaction.member?.user;
    const targets_data = interaction.data.resolved?.users;
    
    const pts_data = await snipeManager.log_snipe(sniper_data, targets_data, env);
    
    const target_msg = msgManager.get_target_msg(targets_data);
    const szn_msg = "";  
    const SNIPE_RESPONSE = `${target_msg} \n${szn_msg} **+${pts_data.pts_earned}** points\nYou now have **${pts_data.total_pts}** Points! `;


    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: SNIPE_RESPONSE
        },
    });
}
