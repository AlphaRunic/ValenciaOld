import { Players } from "@rbxts/services";
import WaitFor from "shared/Utility/Functions/WaitFor";

let PUI: PlayerGui;
if (Players.LocalPlayer)
    PUI = WaitFor<PlayerGui>(Players.LocalPlayer, "PlayerGui");

export class UI {
    public static Folder(): PlayerGui {
        return PUI;
    }

    public static Toggle(toggled: boolean) {
        PUI.GetChildren()
            .filter(e => e.IsA("ScreenGui"))
            .forEach(screenUI => {
                (screenUI as ScreenGui).Enabled = toggled;
            });
    }

    public static Enable() {
        UI.Toggle(true);
    }

    public static Disable() {
        UI.Toggle(false);
    }

    public static Menu(): PlayerGui["Menu"] {
        return PUI.WaitForChild("Menu") as PlayerGui["Menu"];
    }

    public static LoadScreen(): PlayerGui["LoadScreen"] {
        return PUI.WaitForChild("LoadScreen") as PlayerGui["LoadScreen"];
    }

    public static FindElement<T extends Instance>(instance: Instance, instanceName: string): T {
        return instance.WaitForChild(instanceName) as T;
    }
}

export { PUI };