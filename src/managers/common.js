import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../server';

export async function get_user_data(user, env) { // this will always return a json object
    const user_id = user?.id;
    if (!user_id) {
        console.error("User ID is undefined");
        return null;
    }
    const user_data = await env.SNIPE_DATA.get(user_id);
    if (!user_data) {
        console.log("No user data found for ID, returning default values");
        return {
            out: 0,
            in: 0,
            pts: 0,
            username: user?.username || 'Unknown User',
            opted_in: true
        };
    }

    return JSON.parse(user_data);
}

export async function save_user_data(user, json_data, env) {
    const user_id = user?.id;
    await env.SNIPE_DATA.put(user_id, JSON.stringify(json_data));
}

export async function opted_in(user_data) {
    return user_data?.opted_in !== false; // Default to true if not set
}

export async function get_json_response(content, ephemeral = false) {
    return new JsonResponse({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: content,
            flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : 0, // EPHEMERAL flag
        },
    });
}