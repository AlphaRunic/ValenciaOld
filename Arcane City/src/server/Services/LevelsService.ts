import { KnitServer as Knit } from "@rbxts/knit";
import { Debris as Trash } from "@rbxts/services";
import { Assets, GameStats } from "shared/structs";
import Tweenable from "shared/Util/Tweenable";
import Weld from "shared/Util/Weld";

declare global {
    interface KnitServices {
        LevelsService: typeof LevelsService;
    }
}

function GetStatsFor(plr: Player): GameStats {
    const data = Knit.GetService("DataManager");
    return data.Get<GameStats>(plr, "gameStats");
}

function SetStatsFor(plr: Player, newStats: GameStats): void {
    const data = Knit.GetService("DataManager");
    data.Set<GameStats>(plr, "gameStats", newStats);
}

const { abs, clamp, floor, huge: inf } = math;
const LevelsService = Knit.CreateService({
    Name: "LevelsService",

    Client: {
        GetXPUntilNext(plr: Player): number {
            return this.Server.GetXPUntilNext(plr);
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
        const untilNext: number = this.GetXPUntilNext(plr);
        if (xp >= untilNext) {
            const difference: number = abs(clamp(xp - untilNext, -inf, 0));
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

        const char = plr.Character!;
        const vfx = Assets.VFX.LevelUp.Clone();
        const root = char.PrimaryPart!;
        const weld = <Weld>Weld(root, vfx, false);
        weld.C1 = root.CFrame.sub(new Vector3(0, 1));
        vfx.Spiral.Enabled = true;
        vfx.Beams.Enabled = true;
        vfx.Parent = char;

        const vfxTwn = new Tweenable(weld, 1.6, Enum.EasingStyle.Back, .3);
        vfxTwn.TweenOut({
            C1: weld.C1.mul(new CFrame(0, -2, 0))
        }).Completed.Connect(() => {
            vfx.Spiral.Enabled = false;
            vfx.Beams.Enabled = false;
            Trash.AddItem(vfx, 4);
        });
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

    GetXPUntilNext(plr: Player): number {
        const stats: GameStats = GetStatsFor(plr);
        return floor(750 + (stats.Level / .3) ^ 2.3);
    }
});

export = LevelsService;