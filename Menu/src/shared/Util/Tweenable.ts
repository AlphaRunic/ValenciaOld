import { TweenService } from "@rbxts/services";

export default class Tweenable<I extends Instance = Instance> {
    public constructor(
        public readonly Instance: I,
        public readonly Time?: number,
        public readonly Style?: Enum.EasingStyle
    ) {}

    private AssertProperties(): void {
        assert(this.Time, "Cannot tween without a time property");
        assert(this.Style, "Cannot tween without an easing style property");
    }

    public Tween(goal: Partial<ExtractMembers<Instance, Tweenable<I>>>): Tween {
        this.AssertProperties();
        const info = new TweenInfo(this.Time, this.Style);
        return this.TweenCustom(info, goal);
    }

    public TweenIn(goal: Partial<ExtractMembers<Instance, Tweenable<I>>>): Tween {
        return this.Tween(goal);
    }

    public TweenOut(goal: Partial<ExtractMembers<Instance, Tweenable<I>>>): Tween {
        this.AssertProperties();
        const info = new TweenInfo(this.Time, this.Style, Enum.EasingDirection.Out);
        return this.TweenCustom(info, goal);
    }

    public TweenInOut(goal: Partial<ExtractMembers<Instance, Tweenable<I>>>): Tween {
        this.AssertProperties();
        const info = new TweenInfo(this.Time, this.Style, Enum.EasingDirection.InOut);
        return this.TweenCustom(info, goal);
    }

    public TweenCustom(info: TweenInfo, goal: Partial<ExtractMembers<Instance, Tweenable<I>>>): Tween {
        const t: Tween = TweenService.Create(this.Instance, info, goal);
        t.Play();
        return t;
    }
}