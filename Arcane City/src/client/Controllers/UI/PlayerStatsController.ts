import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { CharStats, UI } from "shared/structs";
import FormatInt from "shared/Util/FormatInt";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        PlayerStatsController: typeof PlayerStatsController;
    }
}

const main = UI.Main();
const gameUI = main.Game;
const statsList = gameUI.Stats.List;
const healthBase = gameUI.HealthBase;

function UpdateStat<T = unknown>(stat: string, value: T): void {
    const statLabel = <TextLabel>statsList.WaitForChild(stat);
    statLabel.Text = `${stat} : ${value}`;
}

const PlayerStatsController = Knit.CreateController({
    Name: "PlayerStatsController",

    Update(stats: CharStats): void {
        UpdateStat("Damage", stats.Damage);
        UpdateStat("Resist", stats.Resist);

        const statLabel = <TextLabel>statsList.WaitForChild("Health");
        statLabel.Text = `Health : ${FormatInt(stats.Health)} / ${FormatInt(stats.MaxHealth)}`;
        healthBase.Value.Text = FormatInt(stats.Health);
        healthBase.Clipping.Image.Position = new UDim2(0, 0, (stats.Health / stats.MaxHealth) - 1, 0);
        healthBase.Clipping.Position = new UDim2(.5, 0, .38, healthBase.Clipping.Size.Y.Scale / 2);
    },

    KnitStart(): void {
        print("PlayerStatsController active");
        const key = Enum.KeyCode;
        const style = Enum.EasingStyle;
        const inputState = Enum.UserInputState;

        const input = Knit.GetController("InputController");
        const statsUI = new Tweenable(gameUI.Stats, .4, style.Back);
        const openPos = <UDim2>gameUI.Stats.GetAttribute("OpenPos");
        const closedPos = <UDim2>gameUI.Stats.GetAttribute("ClosedPos");

        input.Bind("ToggleStats", (name, state) => {
            if (state === inputState.Begin)
                statsUI.TweenOut({ Position:  openPos });
            else if (state === inputState.End)
                statsUI.TweenIn({ Position: closedPos });
        }, false, key.Tab);
    }
});

export = PlayerStatsController;