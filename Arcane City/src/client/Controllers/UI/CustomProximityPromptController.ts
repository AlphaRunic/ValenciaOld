import { KnitClient as Knit } from "@rbxts/knit";
import { ProximityPromptService } from "@rbxts/services";
import { UI } from "shared/structs";
import GetDialoguePrompt from "client/Roact/DialoguePrompt";
import Roact from "@rbxts/roact";

declare global {
    interface KnitControllers {
        CustomProximityPromptController: typeof CustomProximityPromptController;
    }
}

const main = UI.Main();
function CreatePrompt(prompt: ProximityPrompt): Callback {
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
    const changedConn = prompt.Triggered.Connect(UpdateUIFromPrompt);
    UpdateUIFromPrompt();

    return function(): void {
        changedConn.Disconnect()
        Roact.unmount(promptTree);
    };
}

const CustomProximityPromptController = Knit.CreateController({
    Name: "CustomProximityPromptController",

    KnitStart(): void {
        print("CustomProximityPromptController active");
        ProximityPromptService.PromptShown.Connect(prompt => {
            if (prompt.Style === Enum.ProximityPromptStyle.Default) return;
            const Teardown = CreatePrompt(prompt);
            prompt.PromptHidden.Connect(Teardown);
        });
    },
});

export = CustomProximityPromptController;