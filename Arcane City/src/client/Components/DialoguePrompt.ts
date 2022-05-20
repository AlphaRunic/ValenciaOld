import { Component, KnitClient as Knit } from "@rbxts/knit";
import { Spacify } from "shared/Util/Spacify";
import { Tween } from "shared/Util/Tween";

class DialoguePrompt implements Component.ComponentClass {
    public static Tag = "DialoguePrompt";

    constructor(character: Instance) {
        const isModel = character.IsA("Model"), 
            isPart = character.IsA("BasePart"), 
            cType = isModel || isPart;

        assert(cType);
        const quests = Knit.GetService("QuestService");
        const dialogue = Knit.GetController("DialogueController");
        const characterName: string = Spacify(character.Name);
        print("DialoguePromptComponent modifying: " + characterName);

        const prompt = new Instance("ProximityPrompt");
        prompt.ObjectText = characterName;
        prompt.ActionText = "Talk";
        prompt.KeyboardKeyCode = Enum.KeyCode.X;
        prompt.GamepadKeyCode = Enum.KeyCode.ButtonX;
        prompt.Style = Enum.ProximityPromptStyle.Custom;
        prompt.ClickablePrompt = false;
        prompt.RequiresLineOfSight = false;
        prompt.Parent = isModel ? character.PrimaryPart : character;

        function SetupDialogue(questName: string): void {
            prompt.Enabled = false;
            const d = dialogue.Create(<Model>character, questName);
            d.Finished.Connect(() => {
                quests.CompleteCurrent();
                if (character.GetAttribute("Vanish")) {
                    const Fade = (part: BasePart) =>
                        Tween(part, new TweenInfo(1.5, Enum.EasingStyle.Sine), { Transparency: 1 })
                            .Completed.Connect(() => part.Destroy());

                    if (character.IsA("BasePart"))
                        Fade(character);
                    for (const part of character.GetDescendants())
                        if (part.IsA("BasePart"))
                            Fade(part);
                }
            });
            d.Start();
        }
        
        prompt.Triggered.Connect(() => {
            const currentQuest = quests.GetCurrentQuest();
            const dialogueList = <Folder>character.FindFirstChild("Dialogue");
            const atCorrectQuest = dialogueList.FindFirstChild(currentQuest.Name);
            if (atCorrectQuest)
                SetupDialogue(currentQuest.Name);
        });
    }

    public Destroy() {}
}

export = DialoguePrompt;