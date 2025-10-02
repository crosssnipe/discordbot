import { PointManager } from "../managers/point_manager";
import { SnipeManager } from "../managers/snipe_manager.js";
import * as utils from '../managers/common.js';

export async function handleEraseSnipe(interaction, env) {
    const options = interaction.data.options;
    const pointManager = new PointManager(env);
    const snipeManager = new SnipeManager(env);

    const sniperUser = options.find(opt => opt.name === 'sniper')?.value;
    const targetUser = options.find(opt => opt.name === 'target')?.value;
    const points = options.find(opt => opt.name === 'points')?.value;


    const sniper_data = await utils.get_user_data_id(sniperUser, env); // json object for sniper
    const target_data = await utils.get_user_data_id(targetUser, env); // json object for sniper
    

    await pointManager.add_points(sniper_data, -1 * points);
    await snipeManager.decrement_out(sniper_data);
    await snipeManager.decrement_in(target_data);

    await snipeManager.save_user_data(sniperUser, sniper_data);
    await snipeManager.save_user_data(targetUser, target_data);
    await snipeManager.leaderBoardManager.update_leaderboard(sniperUser, sniper_data);

    const response = `Erased snipe by <@${sniperUser}> on <@${targetUser}> : -${points} points`;
    return utils.get_json_response(response, false);
}