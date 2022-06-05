import { Tween } from "./Tween";

export function HoverColor(button: ImageButton, color: Color3, defaultColor: Color3, spd: number) {
    button.MouseEnter.Connect(() => HoverColorOn(button, color, spd));
    button.MouseLeave.Connect(() => HoverColorOff(button, defaultColor, spd));
}

export function HoverColorOn(button: ImageButton, color: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);    
    return Tween(button, info, {
        ImageColor3: color
    });
}

export function HoverColorOff(button: ImageButton, defaultColor: Color3, spd: number): Tween {
    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
    return Tween(button, info, {
        ImageColor3: defaultColor
    });
}