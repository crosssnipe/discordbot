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

    async update_leaderboard(sniper_data) {
        let leaderboard_data = await this.get_leaderboard();
        const original_leaderboard = JSON.parse(JSON.stringify(leaderboard_data));
        const sniper_user = sniper_data["username"];
        const sniper_total_pts = sniper_data["pts"];
        
        leaderboard_data = leaderboard_data.filter(entry => entry["user"] !== sniper_user);
        leaderboard_data.push({"user": sniper_user, "total_pts": sniper_total_pts})
        leaderboard_data.sort((a, b) => b.total_pts - a.total_pts);
        leaderboard_data = leaderboard_data.slice(0, 10);
        
        console.log(leaderboard_data)

        const changed = JSON.stringify(leaderboard_data) !== JSON.stringify(original_leaderboard);
        if (changed){
            await this.save_leaderboard(leaderboard_data)
        }
        
        
    }

    async save_leaderboard(leaderboard_data) {
        await this.env.SNIPE_DATA.put("leaderboard", JSON.stringify(leaderboard_data))
    }

    async leaderboard_msg() {
        let leaderboard_data = await this.get_leaderboard();
        return JSON.stringify(leaderboard_data);
    }
}