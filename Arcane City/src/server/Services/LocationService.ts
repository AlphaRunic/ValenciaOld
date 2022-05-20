import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";
import { TeleportService as Teleporter } from "@rbxts/services";
import { Assets } from "shared/structs";

declare global {
    interface KnitServices {
        LocationService: typeof LocationService;
    }
}

const LocationService = Knit.CreateService({
    Name: "LocationService",

    Client: {
        Teleported: new RemoteSignal<() => void>(),
        PlaceTeleported: new RemoteSignal<() => void>(),

        Teleport(plr: Player, spawnPoint: BasePart): void {
            this.Server.Teleport(plr, spawnPoint);
        },

        PlaceTeleport(plr: Player, placeId: number): void {
            this.Server.PlaceTeleport(plr, placeId);
        }
    },

    PlaceTeleport(plr: Player, placeId: number): void {
        this.Client.PlaceTeleported.Fire(plr);
        Teleporter.Teleport(placeId, plr, undefined, Assets.UI.LoadScreen);
    },

    Teleport(plr: Player, spawnPoint: BasePart): void {
        const root = <Part>plr.Character.PrimaryPart;
        root.CFrame = spawnPoint.CFrame.add(spawnPoint.CFrame.LookVector.mul(5));
        this.Client.Teleported.Fire(plr);
    },

    TeleportV3(plr: Player, pos: Vector3): void {
        const root = <Part>plr.Character.PrimaryPart;
        root.CFrame = new CFrame(pos);
        this.Client.Teleported.Fire(plr);
    }
});

export = LocationService;