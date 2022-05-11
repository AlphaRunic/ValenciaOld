/* eslint-disable prefer-const */
import { KnitClient as Knit } from "@rbxts/knit";
import { RunService, StarterGui, Stats, UserInputService as Input } from "@rbxts/services";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { GameStats, UI } from "shared/structs";
import { $print } from "rbxts-transform-debug";
import FormatInt from "shared/Util/FormatInt";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        UIController: typeof UIController;
    }
}

const main = UI.GetMain(Player);
const gameUI = main.Game;
const debugUI = main.Debug;
const coins = gameUI.Coins;
const gems = gameUI.Gems;
const xp = gameUI.XP.Bar;
const level = gameUI.Level;
const questGuide = gameUI.QuestInstructions;

const UIController = Knit.CreateController({
    Name: "UIController",
    
    KnitStart() {
        $print("UIController active");
        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);

        const app = Knit.GetService("GameService");
        const data = Knit.GetService("DataManager");
        const levels = Knit.GetService("LevelsService");
        const quests = Knit.GetService("QuestService");
        const location = Knit.GetService("LocationService");
        const questArrow = Knit.GetController("QuestArrowController");
        const mouseLock = Knit.GetController("MouseLockController");
        const playerStats = Knit.GetController("PlayerStatsController");
        const notification = Knit.GetController("NotificationController");
        const loadScreen = Knit.GetController("LoadScreenController");

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
        app.Initiate();

        location.PlaceTeleported.Connect(() => EnableLoadScreen(true));
        location.Teleported.Connect(EnableLoadScreen);
        quests.GameCompleted.Connect(() => {
            $print("game completed");
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
            name = name.sub(6);
            if (name === "gold")
                coins.Value.Text = FormatInt(<number>value);
            if (name === "gems")
                gems.Value.Text = FormatInt(<number>value);
            if (name === "questNumber")
                quests.Assign(<number>value);
            if (name === "gameStats") {
                const stats = <GameStats>value;
                playerStats.UpdateUI(stats.CharacterStats);

                xpBar.Tween({ Size: new UDim2((stats.XP / levels.GetXPUntilNextLevel()) * .93, 0, 1, 0) });
                level.Text = FormatInt(stats.Level);
            }
        });   

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
    }
});

export = UIController;