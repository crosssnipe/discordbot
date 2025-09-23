import { PointManager } from "../managers/point_manager";
import * as utils from '../managers/common.js';

export async function handleAddPoints(interaction, env) {
    const pointManager = new PointManager(env);
    const options = interaction.data.options;

    const user_id = options.find(opt => opt.name === 'user').value;
    const points = options.find(opt => opt.name === 'points').value;

    const user_data = await utils.get_user_data_id(user_id, env); // json object for user

    await pointManager.add_points(user_data, points);
    await pointManager.save_user_data(user_id, user_data);

    await pointManager.leaderBoardManager.update_leaderboard(user_id, user_data);
    
    const response = `Added **${pointsOption.value}** points to <@${userOption.value.id}>. They now have **${user_data["pts"]}** points.`;
    return utils.get_json_response(response, false);
}