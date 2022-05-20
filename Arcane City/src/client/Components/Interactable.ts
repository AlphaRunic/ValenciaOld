import { Component, KnitClient as Knit, Signal } from "@rbxts/knit";
import { Exception } from "shared/Internal/Exception";
import { Assets } from "shared/structs";

export = class Interactable implements Component.ComponentClass {
    public static Tag = "Interactable";

    public constructor(hitbox: Instance) {
        assert(hitbox.IsA("BasePart"));
        print("InteractableComponent modifying: " + hitbox.Name);

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
                        const exit = <BasePart>(<ObjectValue><unknown>hitbox.WaitForChild("Exit")).Value;
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
                    default:
                        throw new Exception(`Unhandled interactable case on hitbox named: ${hitbox.Name}`);
                }
            }
        });
    }

    public Destroy(): void {}
}