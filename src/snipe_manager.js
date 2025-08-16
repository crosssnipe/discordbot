export class SnipeManager {
    constructor(env) {
        this.env = env;
        this.pointManager = new PointManager();
    }

    async log_snipe(sniper, targets) {
        // console.log(sniper);
        // console.log(targets);
        const sniper_id = sniper?.id;

        // set bonus points based on number of targets
        const combo_bonus = this.pointManager.get_combo_bonus(targets);
    
        let total_points = 0;
        let szn_targets = [];
        for (const target of Object.values(targets)) {
            const target_id = target.id;
            let value = await this.pointManager.get_raw_user_value(target, this.env)
            
            let multiplier = 1;

            value = Math.ceil(value * multiplier * combo_bonus);
            await this.increment_out(sniper);
            await this.increment_in(target);
            await this.pointManager.add_points(sniper_id, value, this.env);

            total_points += value;
    
        }

        return total_points;
    }

    async increment_out(sniper) {
        const sniper_id = sniper?.id;
        const exist = await this.env.SNIPE_DATA.get(sniper_id);
        if (!exist) {
            await this.env.SNIPE_DATA.put(sniper_id, JSON.stringify({"out": 1, "in": 0, "pts": 0, "username": sniper?.username}));
        } else {
            const temp = JSON.parse(exist);
            temp.out += 1;
            await this.env.SNIPE_DATA.put(sniper_id, JSON.stringify(temp));
        }
    }

    async increment_in(target) {
        const target_id = target?.id;
        const exist = await this.env.SNIPE_DATA.get(target_id);
        if (!exist) {
            await this.env.SNIPE_DATA.put(target_id, JSON.stringify({"out": 0, "in": 1, "pts": 0, "username": target?.username}));
        } else {
            const temp = JSON.parse(exist);
            temp.in += 1;
            await this.env.SNIPE_DATA.put(target_id, JSON.stringify(temp));
        }
    }

    async user_data(user) {
        const user_id = user?.id;
        const user_data = await this.env.SNIPE_DATA.get(user_id);
        return JSON.parse(user_data);
    }
}

class PointManager {
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

export class MsgManager {
    constructor() {
        this.pointManager = new PointManager();
    }

    get_target_msg(targets) {
        const target_mentions = Object.values(targets).map(user => `<@${user.id}>`);
        if (target_mentions.length == 1){
            return `:gun: Sniped ${target_mentions[0]}!`;
        }
        else {
            let msg = `:gun: Wow! Sniped ${this.format_user_mentions(target_mentions)}! **${this.pointManager.get_combo_bonus(targets)}x combo bonus** applied :fire:`;
            return msg;
        }
    }

    format_user_mentions(target_mentions) {
        let ret_msg = '';

        for (let i = 0; i < target_mentions.length - 1; i++){
            ret_msg += `${target_mentions[i]}, `;
        }
        ret_msg += `and ${target_mentions[target_mentions.length - 1]}`;
        return ret_msg;
    }
}