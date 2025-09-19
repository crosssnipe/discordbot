export class LeaderBoardManager{
    constructor(env) {
        this.env = env;
    }

    async get_leaderboard(){
        // Returns a leaderboard of the top 10 snipers 
        const leaderboard_data = await this.env.SNIPE_DATA.get("leaderboard");
        if (!leaderboard_data) {
            console.log("No Leaderboard data found");
            return [];
        }
        
        return JSON.parse(leaderboard_data);
    }

    async update_leaderboard(sniper_id, sniper_data) {
        let leaderboard_data = await this.get_leaderboard();
        const original_leaderboard = JSON.parse(JSON.stringify(leaderboard_data));
        const sniper_total_pts = sniper_data["pts"];

        leaderboard_data = leaderboard_data.filter(entry => entry["user_id"] !== sniper_id);

        leaderboard_data.push({"user_id": sniper_id, "total_pts": sniper_total_pts})
        leaderboard_data.sort((a, b) => b.total_pts - a.total_pts);
        leaderboard_data = leaderboard_data.slice(0, 10);

        const changed = JSON.stringify(leaderboard_data) !== JSON.stringify(original_leaderboard);
        if (changed){
            await this.save_leaderboard(leaderboard_data)
        }
        
        
    }

    async save_leaderboard(leaderboard_data) {
        await this.env.SNIPE_DATA.put("leaderboard", JSON.stringify(leaderboard_data))
    }

    async leaderboard_msg() {
        let emoji_map = {1: "🥇", 2: "🥈", 3: "🥉"};

        let leaderboard_data = await this.get_leaderboard();
        let response = "## Leaderboard :star2:\n";
        let count = 1;
        leaderboard_data.forEach(entry => {
            response += `${count < 4 ? emoji_map[count] : count}. <@${entry["user_id"]}>  **${entry["total_pts"]} pts**\n`;
            count++;
        });
        return response;
    }
}