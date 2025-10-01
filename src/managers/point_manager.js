export class PointManager {
    get_combo_bonus(targets) {
        let vals = {1: 1, 2: 1.3, 3:1.4, 4: 1.45, 5: 1.5}
        return vals[targets.size] || 1;
    }


    async get_raw_user_value(target_data){
        if (!target_data) {
            console.error("Target data is undefined");
            return 0;
        }
        const FLOOR_VALUE = 10;

        const out_count = target_data["out"];
        const in_count = target_data["in"];
        const raw_value = (Math.log(out_count + 2) / Math.log(in_count + 2))*20;

        return Math.max(raw_value, FLOOR_VALUE);

    }

    async add_points(sniper_data, pts) {
        if (!sniper_data) {
            console.error("Sniper data is undefined");
            return;
        }

        sniper_data["pts"] += pts;
        return sniper_data["pts"];
    }
}