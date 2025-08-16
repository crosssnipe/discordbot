export class PointManager {
    get_combo_bonus(targets) {
        let vals = {1: 1, 2: 1.3, 3:1.4, 4: 1.45, 5: 1.5}
        return vals[Object.keys(targets).length] || 1;
    }


    async get_raw_user_value(target, env){
        const target_id = target?.id;
        const FLOOR_VALUE = 10;

        // Check if Target ID exists in SNIPE_DATA
        const exist = await env.SNIPE_DATA.get(target_id);
    
        if (!exist) {
            await env.SNIPE_DATA.put(target_id, JSON.stringify({"out": 0, "in": 0, "pts": 0, "username": target?.username}));
        }

        const out_count = JSON.parse(await env.SNIPE_DATA.get(target_id))["out"];
        const in_count = JSON.parse(await env.SNIPE_DATA.get(target_id))["in"];
        const raw_value = (Math.log(out_count + 2) / Math.log(in_count + 2))*20;

        return Math.max(raw_value, FLOOR_VALUE);

    }

    async add_points(sniper_id, pts, env) {
        const sniper = await env.SNIPE_DATA.get(sniper_id);
        const temp = JSON.parse(sniper);
        temp.pts += pts;
        await env.SNIPE_DATA.put(sniper_id, JSON.stringify(temp));
    }
}