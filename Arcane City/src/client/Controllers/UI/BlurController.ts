import { KnitClient as Knit } from "@rbxts/knit";
import { Lighting } from "@rbxts/services";

declare global {
    interface KnitControllers {
        BlurController: typeof BlurController;
    }
}

const BlurController = Knit.CreateController({
    Name: "BlurController",
    Blur: new Instance("BlurEffect"),

    Toggle(active?: boolean): void {
        this.Blur.Enabled = active?? !this.Blur.Enabled;
    },

    KnitInit(): void {
        print("BlurController active")
        this.Blur.Enabled = false;
        this.Blur.Parent = Lighting;
    }
});

export = BlurController;