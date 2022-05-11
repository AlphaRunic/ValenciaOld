/* eslint-disable roblox-ts/lua-truthiness */
import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { TeleportService } from "@rbxts/services";
import Location from "server/Classes/Location";
import Worlds from "server/Classes/Worlds";
import { Assets } from "shared/structs";

declare global {
    interface KnitServices {
        LocationService: typeof LocationService;
    }
}

const LocationService = Knit.CreateService({
    Name: "LocationService",

    Teleported: new Signal<() => void>(),
    PlaceTeleported: new Signal<() => void>(),

    Client: {
        Teleported: new RemoteSignal<() => void>(),
        PlaceTeleported: new RemoteSignal<() => void>(),

        Teleport(plr: Player, spawnPoint: BasePart): void {
            this.Server.Teleport(plr, spawnPoint);
        },

        GoTo(plr: Player, areaName: string, worldName: string): void {
            this.Server.GoTo(plr, areaName, worldName);
        },

        PlaceTeleport(plr: Player, placeId: number): void {
            this.Server.PlaceTeleport(plr, placeId);
        }
    },

    PlaceTeleport(plr: Player, placeId: number): void {
        this.Client.PlaceTeleported.Fire(plr);
        TeleportService.Teleport(placeId, plr, undefined, Assets.UI.LoadScreen);
    },

    Teleport(plr: Player, spawnPoint: BasePart): void {
        const root = <Part>plr.Character.PrimaryPart;
        root.CFrame = spawnPoint.CFrame.add(spawnPoint.CFrame.LookVector.mul(5));
        this.Client.Teleported.Fire(plr);
    },

    GoTo(plr: Player, worldName: string, areaName?: string,): void {
        const world: Location.World = Worlds.Get(worldName);
        const area: Location.Area = areaName ? world.GetArea(areaName) : world.CommonArea;
        this.Teleport(plr, area.SpawnPoint);
    }
});

export = LocationService;