import { Tweener } from "./Tweenable";
import { UI } from "./UI";
import ObjectEvent from "@rbxts/object-event";

export class LoadBar extends Tweener<Frame> {
    private progressSpeed: number;
    private top: Frame;
    private info: TweenInfo;
    private defaultSize: UDim2;

    public Progress: number;
    public Finished: ObjectEvent<unknown[]>;

    public constructor(bar: Frame, progressSpeed = .2) {
        const top = UI.FindElement<Frame>(bar, "Top");
        super(top);
        this.progressSpeed = progressSpeed;
        this.top = top;
        this.info = new TweenInfo(this.progressSpeed);
        this.defaultSize = this.top.Size;

        this.Progress = 0;
        this.Finished = new ObjectEvent();
        this.SetProgress();
    }

    public RandomlyAddProgress(speed = 1) {
        while (this.Progress !== 100)
            this.AddProgress(math.random(1/3, 1.25) * speed);
    }

    public AddProgress(progress = 1) {
        this.SetProgress(this.Progress + progress);
    }

    public SetProgress(progress = 0) {
        this.Progress = math.clamp(progress, 5, 100);
        this.Tween(this.info, {
            Size: new UDim2(
                this.Progress / 100,
                this.defaultSize.X.Offset,
                this.defaultSize.Y.Scale,
                this.defaultSize.Y.Offset
            )
        }).Completed.Wait();

        if (this.Progress === 100)
            this.Finished.Fire();
    }
}