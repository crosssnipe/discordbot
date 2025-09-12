import { PointManager } from './point_manager.js';

export class MsgManager {
    constructor() {
        this.pointManager = new PointManager();
    }

    get_target_msg(targets) {
        const target_mentions = Array.from(targets.keys()).map(user => `<@${user}>`);
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
            ret_msg += `${target_mentions[i]} `;
        }
        ret_msg += `and ${target_mentions[target_mentions.length - 1]}`;
        return ret_msg;
    }

    
}