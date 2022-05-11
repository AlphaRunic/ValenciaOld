import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { RunService } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";

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
        loadScreen.Enabled = active;
    },

    KnitInit(): void {
        $print("LoadScreenController active");
        RunService.RenderStepped.Connect(() => loadScreen.Wheel.Rotation += 2);
    }
});

export = LoadScreenController;