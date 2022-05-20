import { KnitServer as Knit, RemoteSignal } from "@rbxts/knit";

declare global {
    interface KnitServices {
        CombatService: typeof CombatService;
    }
}

const CombatService = Knit.CreateService({
    Name: "CombatService",
    Client: {
        Began: new RemoteSignal<(enemy: Model) => void>(),
    },

    Begin(plr: Player, enemy: Model): void {
        this.Client.Began.Fire(plr, enemy);
    }
});

export = CombatService;