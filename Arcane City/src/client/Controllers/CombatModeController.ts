import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";

declare global {
    interface KnitControllers {
        CombatModeController: typeof CombatModeController;
    }
}

const CombatModeController = Knit.CreateController({
    Name: "CombatModeController",

    KnitStart(): void {
        const combat = Knit.GetService("CombatService");
        combat.Began.Connect((enemy: Model) => {
            print("Combat initiated. " + Player.Name + " vs " + enemy.Name);
        });
    }
});

export = CombatModeController;