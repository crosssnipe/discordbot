import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';

export function handleSnipe(interaction, env) {
    const SNIPE_RESPONSE = `Sniped! 🎯`;

    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: SNIPE_RESPONSE,
        },
    });
}
