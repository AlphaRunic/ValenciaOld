import { Component, KnitServer as Knit } from "@rbxts/knit";
import { Workspace } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";
import Enemy from "server/Classes/Enemy";
import RandomElement from "shared/Util/RandomElement";

const MAX_ENEMIES_IN_AREA = 25;
class EnemySpawner implements Component.ComponentClass {
    public static Tag = "EnemySpawner";
    
    constructor(spawner: Instance & { Enemies: Folder }) {
        assert(spawner.IsA("BasePart"));
        $print("EnemySpawnerComponent modifying: " + spawner.Name + " in " + spawner.Parent.Name);

        const enemy = Knit.GetService("EnemyService");
        let storageFull = false;
        task.spawn(() => {
            while (true) {
                task.wait(1);
                if (storageFull) return;
                const enemyList: string[] = spawner.Enemies.GetChildren().map(i => i.Name);
                const e: Enemy = enemy.Create(RandomElement(enemyList), spawner);
                const storageUnit: Folder = this.SpawnEnemy(e, spawner);
                if (storageUnit.GetChildren().size() === MAX_ENEMIES_IN_AREA)
                    storageFull = true;
                else
                    storageFull = false;
            }
        });
    }

    public SpawnEnemy(e: Enemy, spawner: BasePart): Folder {
        if (e.Spawner === spawner) {
            const pos = spawner.Position;
            const size = spawner.Size;
            
            const rng = new Random();
            const x = rng.NextInteger(pos.X - (size.X / 2), pos.X + (size.X / 2));
            const z = rng.NextInteger(pos.Z - (size.Z / 2), pos.Z + (size.Z / 2));
            e.Teleport(new Vector3(x, 0, z));

            const storageUnit: Folder = this.GetStorageUnit(e);
            e.Model.Parent = storageUnit;
            return storageUnit;
        }
    }

    private GetStorageUnit(e: Enemy): Folder {
        return <Folder>Workspace.EnemyStorage.FindFirstChild(e.Area.Name);
    }

    public Destroy() {}
}

export = EnemySpawner;