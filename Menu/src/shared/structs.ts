import { ReplicatedFirst } from "@rbxts/services";

export const Assets = ReplicatedFirst.Assets;

export class UI {
    public static GetMain(plr: Player): PlayerGui["Menu"] {
        return plr.WaitForChild("PlayerGui").WaitForChild("Menu", 10) as PlayerGui["Menu"];
    }
}