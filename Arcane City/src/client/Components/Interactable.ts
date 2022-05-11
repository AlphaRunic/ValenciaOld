/* eslint-disable prefer-const */
import { Component, KnitClient as Knit, Signal } from "@rbxts/knit";
import { $print, $warn } from "rbxts-transform-debug";
import { Assets } from "shared/structs";

export = class Interactable implements Component.ComponentClass {
    public static Tag = "Interactable";

    public constructor(hitbox: Instance) {
        assert(hitbox.IsA("BasePart"));
        $print("InteractableComponent modifying: " + hitbox.Name);

        switch(hitbox.Name) {
            case "Shop": {
                const marker: MeshPart = Assets.InteractableMarker.Clone();
                marker.CFrame = CFrame.lookAt(
                    new Vector3(hitbox.Position.X, 4, hitbox.Position.Z),
                    hitbox.CFrame.LookVector
                    );
                    marker.Parent = hitbox;
            }
        }
            
        const shop = Knit.GetController("ShopController");
        const quests = Knit.GetService("QuestService");
        const location = Knit.GetService("LocationService");
        let touchDB = false;
        hitbox.Touched.Connect(hit => {
            if (touchDB) return;
            
            const humanoid = hit.Parent?.FindFirstChildOfClass("Humanoid");
            if (humanoid) {
                touchDB = true;
                const currentQuest = quests.GetCurrentQuest();
                switch(hitbox.Name) {
                    case "CommonEntrance": {
                        const exit = <BasePart>(hitbox.WaitForChild("Exit") as ObjectValue).Value;
                        location.Teleport(exit);
                        touchDB = false;
                        break;
                    }
                    case "Shop": {
                        shop.Toggle(true);
                        let conn: Signal.Connection;
                        conn = shop.Toggled.Connect(active => {
                            if (!active) {
                                task.wait(2.5);
                                conn.Disconnect();
                                touchDB = false;
                            }
                        });
                        break;
                    }
                    case "Crystal": {
                        if (currentQuest?.Name === "What's This?") {
                            quests.CompleteCurrent();
                            hitbox.Destroy();
                            touchDB = false;
                        }
                        break;
                    }
                    default: $warn(`Unhandled interactable case on hitbox named: ${hitbox.Name}`);
                }
            }
        });
    }

    public Destroy(): void {}
}