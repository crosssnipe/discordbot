import { JsonResponse } from '../server.js';
import { InteractionResponseType, InteractionResponseFlags } from 'discord-interactions';

export function handlePing(interaction, env) {
    const PING_RESPONSE = `Pong! 🏓`;
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: PING_RESPONSE,
            flags: InteractionResponseFlags.EPHEMERAL,
        },
    });
}