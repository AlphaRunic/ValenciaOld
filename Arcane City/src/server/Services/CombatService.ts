import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { $print } from "rbxts-transform-debug";

declare global {
    interface KnitServices {
        CombatService: typeof CombatService;
    }
}

const CombatService = Knit.CreateService({
    Name: "CombatService",

    Began: new Signal<(plr: Player, enemy: Model, battleArea: Model) => void>(),
    Client: {
        Began: new RemoteSignal<(plr: Player, enemy: Model, battleArea: Model) => void>(),
    },

    Begin(plr: Player, enemy: Model): void {
        $print("Combat initiated. " + plr.Name + " vs " + enemy.Name);
        // this.Client.Began.Fire(plr, enemy);
    }
});

export = CombatService;