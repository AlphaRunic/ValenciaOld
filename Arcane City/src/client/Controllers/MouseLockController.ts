import { KnitClient as Knit } from "@rbxts/knit";
import { RunService, UserInputService as Input } from "@rbxts/services";

declare global {
    interface KnitControllers {
        MouseLockController: typeof MouseLockController;
    }
}

let conn: RBXScriptConnection;
const MouseLockController = Knit.CreateController({
    Name: "MouseLockController",

    Toggle(active: boolean): void {
        if (active)
            conn = RunService.RenderStepped.Connect(() => Input.MouseBehavior = Enum.MouseBehavior.LockCenter);
        else {
            conn.Disconnect()
            Input.MouseBehavior = Enum.MouseBehavior.Default
        }
    }
});

export = MouseLockController;