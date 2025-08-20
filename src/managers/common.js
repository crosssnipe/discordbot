export async function get_user_data(user, env) { // this will always return a json object
    const user_id = user?.id;
    if (!user_id) {
        console.error("User ID is undefined");
        return null;
    }
    const user_data = await env.SNIPES_DATA.get(user_id);
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
    await env.SNIPES_DATA.put(user_id, JSON.stringify(json_data));
}