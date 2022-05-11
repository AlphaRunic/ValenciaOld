import { KnitServer as Knit } from "@rbxts/knit";

declare global {
    interface KnitServices {
        CharacterLockService: typeof CharacterLockService;
    }
}

const CharacterLockService = Knit.CreateService({
    Name: "CharacterLockService",

    Client: {
        Toggle(plr: Player, active: boolean) {
            this.Server.Toggle(plr, active);
        }
    },

    Toggle(plr: Player, active: boolean) {
        for (const part of plr.Character.GetChildren())
            if (part.IsA("BasePart"))
                part.Anchored = active;
    }
});

export = CharacterLockService;