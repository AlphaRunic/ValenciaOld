import { KnitServer as Knit } from "@rbxts/knit";
import { GameStats } from "shared/structs";

declare global {
    interface KnitServices {
        LevelsService: typeof LevelsService;
    }
}

const data = Knit.GetService("DataManager");
function GetStatsFor(plr: Player): GameStats {
    return data.Get<GameStats>(plr, "gameStats");
}

function SetStatsFor(plr: Player, newStats: GameStats): void {
    data.Set<GameStats>(plr, "gameStats", newStats);
}

const { abs, clamp, floor, huge } = math;
const LevelsService = Knit.CreateService({
    Name: "LevelsService",

    Client: {
        GetXPUntilNextLevel(plr: Player): number {
            return this.Server.GetXPUntilNextLevel(plr);
        },
        
        AddXP(plr: Player, amount: number): void {
            this.Server.AddXP(plr, amount);
        },

        AddLevel(plr: Player): void {
            this.Server.AddLevel(plr);
        },

        GetXP(plr: Player): number {
            return this.Server.GetXP(plr);
        },

        GetLevel(plr: Player): number {
            return this.Server.GetLevel(plr);
        },

        CheckLevelUpAvailability(plr: Player): void {
            this.Server.CheckLevelUpAvailability(plr);
        }
    },

    CheckLevelUpAvailability(plr: Player): void {
        const xp: number = this.GetXP(plr);
        const untilNext: number = this.GetXPUntilNextLevel(plr);
        if (xp >= untilNext) {
            const difference: number = abs(clamp(xp - untilNext, -huge, 0));
                if (difference > 0)
                this.AddXP(plr, difference);

            this.AddLevel(plr);
            this.SetXP(plr, 0);
        }
    },

    GetXP(plr: Player): number {
        const stats: GameStats = GetStatsFor(plr);
        return stats.XP;
    },

    GetLevel(plr: Player): number {
        const stats: GameStats = GetStatsFor(plr);
        return stats.Level;
    },

    AddLevel(plr: Player): void {
        const stats: GameStats = GetStatsFor(plr);
        stats.Level += 1;
        SetStatsFor(plr, stats);
    },

    AddXP(plr: Player, amount: number): void {
        const stats: GameStats = GetStatsFor(plr);
        this.SetXP(plr, stats.XP + amount);
        this.CheckLevelUpAvailability(plr);
    },

    SetXP(plr: Player, xp: number): void {
        const stats: GameStats = GetStatsFor(plr);
        stats.XP = xp;
        SetStatsFor(plr, stats);
    },

    GetXPUntilNextLevel(plr: Player): number {
        const stats: GameStats = GetStatsFor(plr);
        return floor(750 + (stats.Level / .3) ^ 2);
    }
});

export = LevelsService;