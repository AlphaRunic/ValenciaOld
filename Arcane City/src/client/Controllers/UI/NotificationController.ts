import { KnitClient as Knit } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Assets, UI } from "shared/structs";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        NotificationController: typeof NotificationController;
    }
}

const main = UI.GetMain(Player);
const interaction = main.Interactions;
const notificationCenter = interaction.NotificationCenter;

const NotificationController = Knit.CreateController({
    Name: "NotificationController",

    Send(message: string) {
        const notifLabel: TextLabel = Assets.UI.NotificationLabel.Clone();
        notifLabel.Text = message;
        notifLabel.Parent = notificationCenter;

        const notif = new Tweenable<TextLabel>(notifLabel);
        notif.TweenCustom(
            new TweenInfo(.75, Enum.EasingStyle.Sine, Enum.EasingDirection.In, 0, false, 5), 
            { TextTransparency: 1, TextStrokeTransparency: 1 }
        ).Completed.Connect(() => notifLabel.Destroy());
    }
});

export = NotificationController;