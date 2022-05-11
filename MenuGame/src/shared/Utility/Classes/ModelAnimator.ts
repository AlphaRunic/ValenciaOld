import { Exception } from "../../Internal/Exception";

export default class ModelAnimator {
    private tracks = new Map<string, AnimationTrack>();
    private controller?: Animator;
    private animFolder?: Folder;

    constructor(
        public Model?: Model,
        animationsFolder?: Folder
    ) {
        if (Model) {
            const animController = Model.FindFirstChildOfClass("AnimationController");
            this.controller = animController?.WaitForChild("Animator") as Animator;
            this.animFolder = animationsFolder?? Model.FindFirstChild("Animations") as Folder | undefined;
        }
    }

    public SetAnimationFolder(folder: Folder): void {
        this.animFolder = folder;
    }

    private GetAnimation(animName: string): Animation {
        return this.animFolder!.WaitForChild(animName) as Animation
    }

    public Load(animName: string): AnimationTrack {
        const anim: Animation = this.GetAnimation(animName);
        const track: AnimationTrack = this.controller!.LoadAnimation(anim);
        this.tracks.set(animName, track);
        return track
    }

    public Animate(animName: string, spd?: number): AnimationTrack {
        this.StopAllAnimations();
        return this.AnimateAsync(animName, spd);
    }

    public AnimateAsync(animName: string, spd?: number): AnimationTrack {
        const track = this.tracks.get(animName)!;
        track.Stopped.Connect(() => this.tracks.delete(animName));
        track.Play(undefined, undefined, spd);
        return track;
    }

    public StopAnimation(animName: string): void {
        const track = this.tracks.get(animName);
        track?.Stop();
    }

    public StopAllAnimations(): void {
        this.tracks.forEach((track: AnimationTrack, animName: string) => this.StopAnimation(animName));
    }
}