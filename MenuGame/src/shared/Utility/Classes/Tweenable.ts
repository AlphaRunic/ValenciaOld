import { Tween } from "../Functions/UI/Tween";

export class Tweener<T extends Instance = Instance> {
    public constructor(
        public readonly Instance: T
    ) {}

    public Tween(tweenInfo: TweenInfo, goal: Partial<ExtractMembers<T, Tweenable>>): Tween {
        return Tween<T>(this.Instance, tweenInfo, goal);
    }
}