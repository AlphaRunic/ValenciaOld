/* eslint-disable roblox-ts/lua-truthiness */
import { KnitClient as Knit, Signal } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { UI } from "shared/structs";
import { Spacify } from "shared/Util/Spacify";

declare global {
    interface KnitControllers {
        DialogueController: typeof DialogueController;
    }
}

const main = UI.Main(Player);
const dialogueFrame = main.Interactions.Dialogue;

const charLock = Knit.GetService("CharacterLockService");
const mouseLock = Knit.GetController("MouseLockController");
const input = Knit.GetController("InputController");

class Dialogue {
    public readonly Finished = new Signal<() => void>();

    private CurrentText = 1;
    private readonly NextBtnConn = dialogueFrame.Next.MouseButton1Click.Connect(() => this.Next());

    public constructor(
        public readonly Speaker: string,
        public readonly Text: string[],
    ) {}

    public Start(): void {
        charLock.Toggle(true);
        mouseLock.Toggle(false);
        dialogueFrame.Visible = true;
        this.Finished.Connect(() => this.Teardown());
        input.BindUp("DialogueNext", Enum.KeyCode.Space, () => this.Next());
        this.Update();
    }

    private Teardown(): void {
        charLock.Toggle(false);
        mouseLock.Toggle(true);
        dialogueFrame.Visible = false;
        dialogueFrame.Next.Text = "Next";
        input.Unbind("DialogueNext");
        this.NextBtnConn.Disconnect();
    }

    private GetDialogueText(offset = 0): string {
        return this.Text[this.CurrentText - 1 + offset];
    }

    private Update(): void {
        const currentText = this.GetDialogueText();
        if (!currentText)
            return this.Finished.Fire();

        dialogueFrame.Content.Text = currentText;
        dialogueFrame.Speaker.Text = this.Speaker;

        if (!this.GetDialogueText(1))
            dialogueFrame.Next.Text = "Done";
    }

    private Next(): void {
        this.CurrentText += 1;
        this.Update();
    }
}

const DialogueController = Knit.CreateController({
    Name: "DialogueController",

    Create(character: Model): Dialogue {
        const textList: string[] = [];
        const dialogue = <Configuration>character.WaitForChild("Dialogue");
        let attrsRead = false;
        for (let i = 1; !attrsRead; i++) {
            const text = <string>dialogue.GetAttribute(tostring(i));
            textList.push(text);

            if (!dialogue.GetAttribute(tostring(i + 1)))
                attrsRead = true;
        }

        return new Dialogue(Spacify(character.Name), textList);
    }
});

export = DialogueController;