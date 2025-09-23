import { PointManager } from './point_manager.js';
import { MsgManager } from './msg_manager.js';
import { LeaderBoardManager } from './leaderboard_manager.js';

export class SnipeManager {
    constructor(env) {
        this.env = env;
        this.pointManager = new PointManager();
        this.leaderBoardManager = new LeaderBoardManager(env);
    }


    async log_snipe(sniper_id, sniper_data, target_data) {
        // RETURNS JSON WITH POINTS EARNED IN THIS SNIPE AND USER TOTAL POINTS
        // we're going to save the data at the end of this function... 
        // curr change: no function will save data except save_user_data
        // every function will expect to be passed in a json object
        if (!sniper_data || !target_data) {
            console.error("Snipe or target data is undefined");
            return 0;
        }
               // set bonus points based on number of targets
        const combo_bonus = this.pointManager.get_combo_bonus(target_data);
        
        let total_points = 0;
        let szn_targets = []; // todo: implement season targets
        for (const [id, data] of target_data.entries()) {

            let value = await this.pointManager.get_raw_user_value(data)

            let multiplier = 1;

            value = Math.ceil(value * multiplier * combo_bonus);
            await this.increment_out(sniper_data);
            await this.increment_in(data);
            await this.pointManager.add_points(sniper_data, value);

            total_points += value;
            this.save_user_data(id, data);
        }


        this.save_user_data(sniper_id, sniper_data);
        await this.leaderBoardManager.update_leaderboard(sniper_id, sniper_data);
        return { pts_earned: total_points, total_pts: sniper_data["pts"] };
    }


    async increment_out(sniper_data) {
        if (!sniper_data) {
            console.error("Sniper data is undefined");
            return;
        }
        sniper_data["out"] += 1;
    }

    async decrement_out(sniper_data) {
        if (!sniper_data) {
            console.error("Sniper data is undefined");
            return;
        }
        sniper_data["out"] -= 1;
        if (sniper_data["out"] < 0) {
            sniper_data["out"] = 0;
        }
    }

    async increment_in(target_data) {
        if (!target_data) {
            console.error("Target data is undefined");
            return;
        }
        target_data["in"] += 1;

    }

    async decrement_in(target_data) {
        if (!target_data) {
            console.error("Target data is undefined");
            return;
        }  
        target_data["in"] -= 1;
        if (target_data["in"] < 0) {
            target_data["in"] = 0;
        }
    }

    async get_user_data(user) { // this will always return a json object
        
        const user_id = user?.id;
        if (!user_id) {
            console.error("User ID is undefined");
            return null;
        }

        const user_data = await this.env.SNIPE_DATA.get(user_id);
        if (!user_data) {
            console.log(`No user data found for ID ${user_id}, returning default values`);
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


    async save_user_data(user_id, json_data) {
        await this.env.SNIPE_DATA.put(user_id, JSON.stringify(json_data));
    }
}



