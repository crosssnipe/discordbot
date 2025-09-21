import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { LeaderBoardManager } from '../managers/leaderboard_manager.js';
import * as utils from '../managers/common.js';

export async function handleLeaderBoard(interaction, env) {
    
    const leaderboard_manager = new LeaderBoardManager(env);

    

    const msg = await leaderboard_manager.leaderboard_msg();
    return msg;
    return utils.get_json_response(msg, true);
}
