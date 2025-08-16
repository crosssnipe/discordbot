export const log_snipe = async (sniper, targets, env) =>{
    console.log(sniper);
    console.log(targets);

    const sniper_id = sniper?.id;

    console.log(`Sniper ID: ${sniper_id}`);
    console.log(env.name);
    for (const target of Object.keys(targets)) {
        const target_id = target;

        const exist = await env.SNIPE_DATA.get(sniper_id);
        if (!exist) {
            await env.SNIPE_DATA.put(sniper_id, "1");
        }
        else {
            await env.SNIPE_DATA.put(sniper_id, "1");

        }

        const temp = await env.SNIPE_DATA.get(sniper_id);
        console.log(temp);
        console.log(`Target ID: ${target_id}`);
    }
}