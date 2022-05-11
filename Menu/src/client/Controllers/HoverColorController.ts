import { KnitClient as Knit } from "@rbxts/knit";
import Tweenable from "shared/Util/Tweenable";

declare global {
    interface KnitControllers {
        HoverColorController: typeof HoverColorController;
    }
}

const HoverColorController = Knit.CreateController({
    Name: "HoverColorController",

    Enable(buttons: GuiButton[], color: Color3): void {
        for (const b of buttons) {
            const defaultColor = (<ImageButton>b).ImageColor3;
            const btn = new Tweenable(b, .75, Enum.EasingStyle.Sine);
            b.MouseEnter.Connect(() => btn.Tween({ ImageColor3: color }));
            b.MouseLeave.Connect(() => btn.Tween({ ImageColor3: defaultColor }));
        }
    }
});

export = HoverColorController;