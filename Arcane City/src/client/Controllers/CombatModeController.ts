import { KnitClient as Knit } from "@rbxts/knit";

declare global {
    interface KnitControllers {
        CombatModeController: typeof CombatModeController;
    }
}

const CombatModeController = Knit.CreateController({
    Name: "CombatModeController",

    KnitStart(): void {
        const combat = Knit.GetService("CombatService");
        combat.Began.Connect((plr: Player, enemy: Model, battleArea: Model) => {

        });
    }
});

export = CombatModeController;