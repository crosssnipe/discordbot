import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { SnipeManager, MsgManager } from '../snipe_manager.js';


export async function handleSnipe(interaction, env) {
    const snipeManager = new SnipeManager(env);
    const msgManager = new MsgManager();
  

    const sniper_data = interaction.member?.user;
    const targets_data = interaction.data.resolved?.users;
    const points_earned = await snipeManager.log_snipe(sniper_data, targets_data, env);
    
    const target_msg = msgManager.get_target_msg(targets_data);
    const szn_msg = "";    
    const total_points = (await snipeManager.user_data(sniper_data))["pts"];
    const SNIPE_RESPONSE = `${target_msg} \n${szn_msg} **+${points_earned}** points\nYou now have **${total_points}** Points! `;

    
    

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: SNIPE_RESPONSE,
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    });
}
