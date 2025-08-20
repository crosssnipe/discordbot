import { PointManager } from './point_manager.js';
import { MsgManager } from './msg_manager.js';

export class SnipeManager {
    constructor(env) {
        this.env = env;
        this.pointManager = new PointManager();
    }

    async log_snipe(sniper, targets) {
        // RETURNS JSON WITH POINTS EARNED IN THIS SNIPE AND USER TOTAL POINTS
        // we're going to save the data at the end of this function... 
        // curr change: no function will save data except save_user_data
        // every function will expect to be passed in a json object
        if (!sniper || !targets) {
            console.error("Sniper or targets data is undefined");
            return 0;
        }
        let sniper_data = await this.get_user_data(sniper);
        // set bonus points based on number of targets
        const combo_bonus = this.pointManager.get_combo_bonus(targets);

        let total_points = 0;
        let szn_targets = [];
        for (const target of Object.values(targets)) {

            let target_data = await this.get_user_data(target);
            let value = await this.pointManager.get_raw_user_value(target_data)

            let multiplier = 1;

            value = Math.ceil(value * multiplier * combo_bonus);
            await this.increment_out(sniper_data);
            await this.increment_in(target_data);
            await this.pointManager.add_points(sniper_data, value);

            total_points += value;
            this.save_user_data(target, target_data);
            console.log('Target data saved:', target_data);
        }
        this.save_user_data(sniper, sniper_data, this.env);
        return { pts_earned: total_points, total_pts: sniper_data["pts"] };
    }

    async increment_out(sniper_data) {
        if (!sniper_data) {
            console.error("Sniper data is undefined");
            return;
        }
        sniper_data["out"] += 1;
    }

    async increment_in(target_data) {
        if (!target_data) {
            console.error("Target data is undefined");
            return;
        }
        target_data["in"] += 1;

    }


    async get_user_data(user) { // this will always return a json object
        const user_id = user?.id;
        if (!user_id) {
            console.error("User ID is undefined");
            return null;
        }
        const user_data = await this.env.SNIPES_DATA.get(user_id);
        if (!user_data) {
            console.log("No user data found for ID, returning default values", user_id);
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

    async save_user_data(user, json_data) {
        const user_id = user?.id;
        await this.env.SNIPES_DATA.put(user_id, JSON.stringify(json_data));
    }
}



