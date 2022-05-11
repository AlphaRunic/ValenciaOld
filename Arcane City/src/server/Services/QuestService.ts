import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { Workspace } from "@rbxts/services";
import { $print, $warn } from "rbxts-transform-debug";
import { Quest, XPGain } from "server/Classes/Quest";
import Worlds from "server/Classes/Worlds";

declare global {
    interface KnitServices {
        QuestService: typeof QuestService;
    }
}

const data = Knit.GetService("DataManager");
const QuestService = Knit.CreateService({
    Name: "QuestService",

    Quests: [new Quest.Quest("", "Do", "Something", "Somewhere", new Vector3, [])],
    Assigned: new Signal<(goal: Vector3, name: string, instructions: string) => void>(),
    Completed: new Signal<(name: string) => void>(),
    GameCompleted: new Signal<() => void>(),

    Client: {
        Assigned: new RemoteSignal<(goal: Vector3, name: string, instructions: string) => void>(),
        Completed: new RemoteSignal<(questNumber: number) => void>(),
        GameCompleted: new RemoteSignal<() => void>(),

        Assign(plr: Player, questIdx: number): void {
            this.Server.Assign(plr, questIdx);
        },

        Complete(plr: Player, questIdx: number): void {
            this.Server.Complete(plr, questIdx);
        },

        CompleteCurrent(plr: Player): void {
            this.Server.CompleteCurrent(plr);
        },

        GetCurrentQuest(plr: Player): Quest.Quest {
            return this.Server.GetCurrentQuest(plr);
        },

        GetCurrentQuestNumber(plr: Player): number {
            return this.Server.GetCurrentQuestNumber(plr);
        },

        GetQuestByNumber(plr: Player, questNumber: number): Quest.Quest | undefined {
            return this.Server.GetQuestByNumber(questNumber);
        },

        GetQuestByName(plr: Player, questName: string): Quest.Quest | undefined {
            return this.Server.GetQuestByName(questName);
        }
    },

    KnitStart(): void {
        $print("QuestService active");
        const goals = Workspace.QuestGoals;
        const spawns = Workspace.EnemySpawns;
        const ac = Worlds.Get("Arcane City");

        this.Quests = [
            new Quest.Quest(
                "Initiation",
                Quest.Predicate.Interact, 
                "Weapon shop", 
                ac.CommonArea.Name,
                goals.Shop.Position,
                [new XPGain(200)]
            ),
            new Quest.Quest(
                "What's This?",
                Quest.Predicate.GoTo,
                "Strange floating crystal",
                ac.CommonArea.Name,
                goals.Crystal.Position,
                [new XPGain(400)]
            ),
            new Quest.Quest(
                "A Waking Force",
                Quest.Predicate.TalkTo,
                "Old Man",
                ac.CommonArea.Name,
                goals.NPCs.OldMan.PrimaryPart.Position,
                [new XPGain(300)]
            ),
            new Quest.Quest(
                "Learning Experience",
                Quest.Predicate.TalkTo,
                "Librarian",
                "Minotaur Alley",
                goals.NPCs.Librarian.PrimaryPart.Position,
                [new XPGain(400)]
            ),
            new Quest.Quest(
                "Necromantic Wands",
                Quest.Predicate.Defeat,
                "Necromancer",
                "Minotaur Alley",
                spawns["Minotaur Alley"].Spawner.Position,
                [new XPGain(600)]
            )
        ];
    },

    GetQuestByName(questName: string): Quest.Quest | undefined {
        for (const q of this.Quests)
            if (q.Name === questName)
                return q;
    },

    GetQuestByNumber(questNumber: number): Quest.Quest | undefined {
        return this.Quests[questNumber - 1];
    },

    GetCurrentQuestNumber(plr: Player): number {
        return data.Get<number>(plr, "questNumber");
    },

    GetCurrentQuest(plr: Player): Quest.Quest | undefined {
        const quest = this.Quests[this.GetCurrentQuestNumber(plr) - 1];
        if (!quest) return;
        return quest;
    },

    CompleteCurrent(plr: Player): void {
        const current: Quest.Quest = this.GetCurrentQuest(plr);
        const idx: number = this.Quests.indexOf(current) + 1;
        if (current.Completed === true) {
            $warn(`Failed to complete quest at index ${idx} (quest already completed).`);
            return;
        }
        this.Complete(plr, idx);
    },

    Complete(plr: Player, questIdx: number): void {
        const quest: Quest.Quest = this.GetQuestByNumber(questIdx);
        if (!quest) {
            $warn(`Failed to complete quest at index ${questIdx} (quest not found).`);
            return;
        }
        this.Client.Completed.Fire(plr, questIdx);
        quest.Complete(plr);
    },

    Assign(plr: Player, questIdx: number): void {
        const quest: Quest.Quest = this.GetQuestByNumber(questIdx);
        if (!quest) {
            this.Client.GameCompleted.Fire(plr);
            return;
        }
        this.Client.Assigned.Fire(plr, quest.Goal, quest.Name, quest.MakeInstructions());
    }
});

export = QuestService;