import { ClickPop, ClickPopUp, ClickPopDown } from "../Functions/UI/ClickPop";
import { HoverColor, HoverColorOn, HoverColorOff } from "../Functions/UI/HoverColor";
import { HoverPop, HoverPopDown, HoverPopUp } from "../Functions/UI/HoverPop";
import { Tweener } from "./Tweenable";

export interface AnimatedButtonDefaults {
    Size?: UDim2;
    Position?: UDim2;
    ImageColor3?: Color3;
}

export default class AnimatedButton<Base extends GuiButton = GuiButton> extends Tweener<Base> {
    public constructor(button: Base) {
        super(button);
    }

    public ClickPop(pop: number, spd: number): AnimatedButton<Base> {
        ClickPop(this.Instance, pop, spd);
        return this;
    }

    public ClickPopOn(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return ClickPopDown(this.Instance, pop, spd, defaultGoal);
    }

    public ClickPopOff(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return ClickPopUp(this.Instance, pop, spd, defaultGoal);
    }

    private AssertImgBtn(): this is ImageButton {
        if (!this.Instance.IsA("ImageButton")) {
            warn(`AnimatedButton instance "${this.Instance.Name}" must be an ImageButton to use HoverColor. Instance type found was "${typeOf(this.Instance)}"`);
            return false;
        }
        return true;
    }

    public HoverColor(color: Color3, defaultColor: Color3, spd: number): AnimatedButton<Base> | undefined {
        if (!this.AssertImgBtn()) return;
        HoverColor(<ImageButton><unknown>this.Instance, color, defaultColor, spd);
        return this;
    }

    public HoverColorOn(color: Color3, spd: number): Tween | undefined {
        if (!this.AssertImgBtn()) return;
        return HoverColorOn(<ImageButton><unknown>this.Instance, color, spd);
    }

    public HoverColorOff(color: Color3, spd: number): Tween | undefined {
        if (!this.AssertImgBtn()) return;
        return HoverColorOff(<ImageButton><unknown>this.Instance, color, spd);
    }

    public HoverPop(pop: number, spd: number): AnimatedButton<Base> {
        HoverPop(this.Instance, pop, spd)
        return this;
    }

    public HoverPopOn(pop: number, spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return HoverPopUp(this.Instance, pop, spd, defaultGoal);
    }

    public HoverPopOff(spd: number, defaultGoal: AnimatedButtonDefaults): Tween {
        return HoverPopDown(this.Instance, spd, defaultGoal);
    }
}