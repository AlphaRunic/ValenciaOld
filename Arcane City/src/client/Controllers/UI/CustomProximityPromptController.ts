import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { UI } from "shared/structs";
import GetDialoguePrompt from "client/Roact/DialoguePrompt";
import Roact from "@rbxts/roact";
import { $print } from "rbxts-transform-debug";
import { ProximityPromptService } from "@rbxts/services";

declare global {
    interface KnitControllers {
        CustomProximityPromptController: typeof CustomProximityPromptController;
    }
}

type TeardownCallback = () => void;

const main = UI.GetMain(Player);
function CreatePrompt(prompt: ProximityPrompt): TeardownCallback {
    function UpdateUIFromPrompt(): void {
        const promptFrame = main.Interactions.WaitForChild("DialoguePrompt") as Frame
        const action = promptFrame.WaitForChild("Action") as TextLabel;
        const object = promptFrame.WaitForChild("Object") as TextLabel;
        action.Text = prompt.ActionText;
        object.Text = prompt.ObjectText;
        action.AutoLocalize = prompt.AutoLocalize;
        object.AutoLocalize = prompt.AutoLocalize;
        action.RootLocalizationTable = prompt.RootLocalizationTable;
        object.RootLocalizationTable = prompt.RootLocalizationTable;
    }

    const promptTree = Roact.mount(GetDialoguePrompt(prompt), main.Interactions);
    const changedConn = prompt.Changed.Connect(UpdateUIFromPrompt);
    UpdateUIFromPrompt();

    function Teardown(): void {
        changedConn.Disconnect()
        Roact.unmount(promptTree);
    }

    return Teardown;
}

const CustomProximityPromptController = Knit.CreateController({
    Name: "CustomProximityPromptController",

    KnitStart(): void {
        $print("CustomProximityPromptController active");
        ProximityPromptService.PromptShown.Connect(prompt => {
            if (prompt.Style === Enum.ProximityPromptStyle.Default) return;
            const Teardown: TeardownCallback = CreatePrompt(prompt);

            prompt.PromptHidden.Wait();
            Teardown();
        });
    },
});

export = CustomProximityPromptController;