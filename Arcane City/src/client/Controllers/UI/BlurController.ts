import { KnitClient as Knit } from "@rbxts/knit";
import { Lighting } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";

declare global {
    interface KnitControllers {
        BlurController: typeof BlurController;
    }
}

const BlurController = Knit.CreateController({
    Name: "BlurController",
    Blur: new Instance("BlurEffect"),

    Toggle(active: boolean): void {
        this.Blur.Enabled = active;
    },

    KnitInit(): void {
        $print("BlurController active")
        this.Blur.Enabled = false;
        this.Blur.Parent = Lighting;
    }
});

export = BlurController;