import { KnitServer as Knit } from "@rbxts/knit";
import { GameStats } from "../../shared/structs";
import { RunService, Workspace as World } from "@rbxts/services";
import Find from "shared/Util/Find";
import Worlds from "server/Classes/Worlds";

declare global {
    interface KnitServices {
        GameService: typeof GameService;
    }
}

const GameService = Knit.CreateService({
    Name: "GameService",
    
    Client: {
        Initiate(plr: Player): void {
            this.Server.Initiate(plr);
        }
    },
    
    Initiate(plr: Player): void {
        print("GameService active");
        const data = Knit.GetService("DataManager");
        const location = Knit.GetService("LocationService");
        const defaultData = new Map<string, unknown>([
            ["gold", 500],
            ["crystals", 0],
            ["questNumber", 1],
            ["gameStats", new GameStats]
        ]);
        const testData = new Map<string, unknown>([
            ["TEST_gold", 2000],
            ["TEST_crystals", 999999],
            ["TEST_questNumber", 1],
            ["TEST_gameStats", new GameStats]
        ]);

        if (RunService.IsStudio())
            testData.forEach((v, k) => data.Store<typeof v>(plr, k, v));
        else
            defaultData.forEach((v, k) => data.Store<typeof v>(plr, k, v));
        
        const s = data.Get<GameStats>(plr, "gameStats");
        const world = Worlds.Get("Arcane City");
        const commonAreaSpawn = Find<Part>(World, world.CommonArea.Name);
        location.TeleportV3(plr, s.LastLocation?? commonAreaSpawn.Position);
        game.Close.Connect(() => {
            const stats = data.Get<GameStats>(plr, "gameStats");
            stats.LastLocation = plr.Character.PrimaryPart.Position;
            data.Set(plr, "gameStats", stats);
        });
    }
});

export = GameService;