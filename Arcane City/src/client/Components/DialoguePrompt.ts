import { Component, KnitClient as Knit } from "@rbxts/knit";
import { $print } from "rbxts-transform-debug";
import { Spacify } from "shared/Util/Spacify";

class DialoguePrompt implements Component.ComponentClass {
    public static Tag = "DialoguePrompt";

    constructor(instance: Instance) {
        assert(instance.IsA("Model"));

        const quests = Knit.GetService("QuestService");
        const dialogue = Knit.GetController("DialogueController");
        const characterName: string = Spacify(instance.Name);
        $print("DialoguePromptComponent modifying: " + characterName);

        const prompt = new Instance("ProximityPrompt");
        prompt.ObjectText = characterName;
        prompt.ActionText = "Talk";
        prompt.KeyboardKeyCode = Enum.KeyCode.X;
        prompt.GamepadKeyCode = Enum.KeyCode.ButtonX;
        prompt.Style = Enum.ProximityPromptStyle.Custom;
        prompt.ClickablePrompt = false;
        prompt.RequiresLineOfSight = false;
        prompt.Parent = instance.PrimaryPart;
        
        const requiredQuestNumber = <number>instance.GetAttribute("RequiredQuest");
        const requiredQuest = quests.GetQuestByNumber(requiredQuestNumber);

        function SetupDialogue(): void {
            const d = dialogue.Create(<Model>instance);
            d.Finished.Connect(() => quests.CompleteCurrent());
            d.Start();
        }
        
        prompt.Triggered.Connect(plr => {
            const currentQuest = quests.GetCurrentQuest();
            const atCorrectQuest = currentQuest?.Name === requiredQuest!.Name;
            prompt.Enabled = false;
            if (atCorrectQuest)
                SetupDialogue();
        });
    }

    public Destroy() {}
}

export = DialoguePrompt;