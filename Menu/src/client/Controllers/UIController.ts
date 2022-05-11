import { KnitClient as Knit } from "@rbxts/knit";
import { StarterGui, TeleportService, Workspace } from "@rbxts/services";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Assets, UI } from "shared/structs";
import { $print } from "rbxts-transform-debug";

declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const menu = UI.GetMain(Player);
const main = menu.Main;
const { Play, Exit, Options } = main;

const UIController = Knit.CreateController({
    Name: "UIController",

    KnitInit(): void {
        StarterGui.SetCoreGuiEnabled("All", false);
        Workspace.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
        Workspace.CurrentCamera.CFrame = (<Part>Workspace.WaitForChild("Cam", 10)).CFrame;
    },
    
    KnitStart(): void {
        $print("UIController active");
        const loadScreen = Knit.GetController("LoadScreenController");
        const hoverColor = Knit.GetController("HoverColorController");
        hoverColor.Enable([Play, Exit, Options], Color3.fromRGB(156, 79, 79));

        Play.MouseButton1Click.Connect(() => {
            loadScreen.Toggle(true);
            TeleportService.Teleport(8045769892, Player, undefined, Assets.LoadScreen)
        });
    }
});

export = UIController;