import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';
import { LeaderBoardManager } from '../managers/leaderboard_manager.js';

export async function handleLeaderBoard(interaction, env) {
    
    const leaderboard_manager = new LeaderBoardManager(env);

    const msg = await leaderboard_manager.leaderboard_msg();
    console.log(msg)


    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: msg,
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    });
}
