import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { RunService as Runtime, Workspace as World } from "@rbxts/services";
import Wave from "shared/Utility/Classes/Wave";
import WaitFor from "shared/Utility/Functions/WaitFor";

declare global {
    interface KnitControllers {
        MainController: typeof MainController;
    }
}

const MainController = Knit.CreateController({
    Name: "MainController",

    KnitStart(): void {
        const ui = Knit.GetController("UIController");
        ui.Initiate("Main");

        Player.CharacterAdded.Connect(c => {
            let cam = World.CurrentCamera;
            while (cam === undefined)
                cam = World.CurrentCamera;

            WaitFor<Part>(c, "UpperTorso").Anchored = true
            while (cam.CameraType !== Enum.CameraType.Custom)
                cam.CameraType = Enum.CameraType.Custom;

            cam.FieldOfView = 37;
            const camPart = WaitFor<Part>(World, "Cam");
            Runtime.BindToRenderStep("MenuCamera", Enum.RenderPriority.Camera.Value, dt => cam!.CFrame = camPart.CFrame);
        });
    }
});

export = MainController;