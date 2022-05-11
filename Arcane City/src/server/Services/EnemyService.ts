/* eslint-disable prefer-const */
import { KnitServer as Knit } from "@rbxts/knit";
import { Players, Workspace } from "@rbxts/services";
import { Assets } from "shared/structs";
import Location from "server/Classes/Location";
import Enemy from "server/Classes/Enemy";
import Worlds from "server/Classes/Worlds";

declare global {
    interface KnitServices {
        EnemyService: typeof EnemyService;
    }
}

const combat = Knit.GetService("CombatService");
const EnemyService = Knit.CreateService({
    Name: "EnemyService",

    Create(name: string, spawner: BasePart): Enemy {
        const base = <Model>Assets.Enemies.FindFirstChild(name);
        const model: Model = base.Clone();
        const worldName = <string>Workspace.EnemySpawns.GetAttribute("WorldName");
        const world: Location.World = Worlds.Get(worldName);
        const spawnGroup = <Folder>spawner.Parent;
        const area: Location.Area = world.GetArea(spawnGroup.Name);
        
        let conn: RBXScriptConnection;
        conn = model.FindFirstChildOfClass("MeshPart")!.Touched.Connect(hit => {
            const humanoid = hit.Parent?.FindFirstChildOfClass("Humanoid");
            if (humanoid) {
                combat.Begin(Players.GetPlayerFromCharacter(humanoid.Parent), model);
                conn.Disconnect();
            }
        });
        
        return new Enemy(model, spawner, area);
    }
});

export = EnemyService;