import { KnitClient as Knit } from "@rbxts/knit";
import { RunService, StarterGui, Stats } from "@rbxts/services";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Exception } from "shared/Internal/Exception";
import { GameStats, UI } from "shared/structs";
import Tweenable from "shared/Util/Tweenable";
import FormatInt from "shared/Util/FormatInt";

declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const main = UI.Main(Player);
const gameUI = main.Game;
const debugUI = main.Debug;
const gold = gameUI.Gold;
const crystals = gameUI.Crystals;
const xp = gameUI.XP.Bar;
const questGuide = gameUI.QuestInstructions;

const UIController = Knit.CreateController({
    Name: "UIController",

    RunDebugUI(): void {
        if (RunService.IsStudio()) {
            debugUI.Visible = true;
            task.spawn(() => {
                while (debugUI.Visible) {
                    debugUI.DataSend.Text = "Data Send (kb/s): " + math.floor(Stats.DataSendKbps) + " kb/s";
                    debugUI.DataReceive.Text = "Data Receive (kb/s): " + math.floor(Stats.DataReceiveKbps) + " kb/s";
                    debugUI.Memory.Text = "Memory: " + FormatInt(math.floor(Stats.GetTotalMemoryUsageMb())) + "mb";
                    debugUI.Heartbeat.Text = "Heartbeat: " + math.floor(Stats.HeartbeatTimeMs) + "ms";
                    RunService.Heartbeat.Wait();
                }
            });
        }
    },
    
    KnitStart(): void {
        print("UIController active");
        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);

        const gameService = Knit.GetService("GameService");
        const data = Knit.GetService("DataManager");
        const levels = Knit.GetService("LevelsService");
        const quests = Knit.GetService("QuestService");
        const location = Knit.GetService("LocationService");
        const questArrow = Knit.GetController("QuestArrowController");
        const mouseLock = Knit.GetController("MouseLockController");
        const playerStats = Knit.GetController("PlayerStatsController");
        const notification = Knit.GetController("NotificationController");
        const loadScreen = Knit.GetController("LoadScreenController");
        const inventory = Knit.GetController("InventoryController");

        function EnableLoadScreen(inf = false): void {
            loadScreen.Toggle(true);
            if (!inf)
                task.spawn(() => {
                    task.wait(math.random(1, 5));
                    loadScreen.Toggle(false);
                });
        }

        const xpBar = new Tweenable(xp, .15, Enum.EasingStyle.Sine);

        mouseLock.Toggle(true);
        gameService.Initiate();

        location.PlaceTeleported.Connect(() => EnableLoadScreen(true));
        location.Teleported.Connect(EnableLoadScreen);
        quests.GameCompleted.Connect(() => {
            print("game completed");
            questArrow.StopPointing();
            questGuide.Text = "";
        });

        quests.Completed.Connect(i => notification.Send(`Quest Completed: ${quests.GetQuestByNumber(i).Name}`));
        quests.Assigned.Connect((goal, name, instructions) => {
            questArrow.StopPointing();
            questArrow.PointTo(goal);
            questGuide.Text = instructions;
            notification.Send(`New Quest: ${name}`);
        });

        data.DataUpdated.Connect((name: string, value: unknown) => {
            name = RunService.IsStudio() ? name.sub(6) : name;
            switch(name) {
                case "gold":
                    gold.Value.Text = FormatInt(<number>value);
                    break;
                case "crystals":
                    crystals.Value.Text = FormatInt(<number>value);
                    break;
                case "questNumber":
                    quests.Assign(<number>value);
                    break;
                case "gameStats":
                    const stats = <GameStats>value;
                    playerStats.Update(stats.CharacterStats);
                    inventory.Update(stats.OwnedItems);
                    
                    xpBar.Tween({ Size: new UDim2((stats.XP / levels.GetXPUntilNext()) * .93, 0, 1, 0) });
                    break;

                default:
                    throw new Exception("Unhandled database key '" + name + "'");
            }
        });   
        this.RunDebugUI();
    }
});

export = UIController;