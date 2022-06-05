import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { TeleportService as TP } from "@rbxts/services";
import { Exception } from "shared/Internal/Exception";
import { UI } from "shared/Utility/Classes/UI";
import { Menu } from "client/Roact/MenuMain";
import { LoadScreen } from "client/Roact/LoadScreen";
import WaitFor from "shared/Utility/Functions/WaitFor";
import Roact from "@rbxts/roact";


declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const Handles: Roact.Tree[] = [];
const GUI = UI.Folder();
let currentFrame: Frame;
const UIController = Knit.CreateController({
    Name: "UIController",

    Initiate(mainName: keyof PlayerGui["Menu"]): void {
        this.Mount();
        this.FocusMain(mainName);
    },

    Mount(): void {
        Handles.push(
            Roact.mount(LoadScreen, GUI, "LoadScreen"),
            Roact.mount(Menu, GUI, "Menu")
        );
    },

    HandleButton(name: string, switchTo?: string): void {
        const menu = UI.Menu();
        const loadScreen = UI.LoadScreen();
        switch (name) {
            case "Play":
                menu.Enabled = false;
                loadScreen.Enabled = true;
                try {
                    TP.Teleport(8045769892, Player, undefined, loadScreen);
                } catch(e) {
                    warn("Unable to teleport in Roblox Studio test mode.")
                }
                break;
            case "Options":
                this.Switch(menu.Options);
                break;
            case "Exit":
                Player.Kick("Game exited.");
                break;
            case "Back":
                if (!switchTo)
                    throw new Exception("BackButton component with no frame reference");

                const toFrame = WaitFor<Frame>(menu, switchTo);
                this.Switch(toFrame);
                break;

            default:
                throw new Exception(`Unhandled Menu UI button: "${name}"`);
        }
    },

    GetMenu(): typeof GUI.Menu {
        return GUI.Menu;
    },

    FocusMain(mainName: keyof PlayerGui["Menu"]): void {
        const menu = this.GetMenu();
        const mainFrame = WaitFor<Frame>(menu, mainName);
        for (const frame of menu.GetChildren())
            (<Frame>frame).Visible = false;

        mainFrame.Visible = true;
        currentFrame = mainFrame;
    },

    Toggle(element: GuiObject, on: boolean): void {
        element.Visible = on;
    },

    Switch(to: Frame): void {
        this.Toggle(currentFrame, false);
        this.Toggle(to, true);
        currentFrame = to;
    }
});

export = UIController;