import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { RunService } from "@rbxts/services";

declare global {
    interface KnitControllers {
        LoadScreenController: typeof LoadScreenController;
    }
}

const ui = <PlayerGui>Player.WaitForChild("PlayerGui", 6);
const loadScreen = <typeof ui.LoadScreen>ui.WaitForChild("LoadScreen");
const LoadScreenController = Knit.CreateController({
    Name: "LoadScreenController",

    Toggle(active: boolean): void {
        const charLock = Knit.GetService("CharacterLockService");
        loadScreen.Enabled = active;
        charLock.Toggle(active);
    },

    KnitInit(): void {
        RunService.RenderStepped.Connect(() => loadScreen.Wheel.Rotation += 2);
    }
});

export = LoadScreenController;