import { PointManager } from './point_manager.js';
import { MsgManager } from './msg_manager.js';

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



