import { KnitServer as Knit } from "@rbxts/knit";

type DataService = KnitServices["DataManager"];
type LevelsService = KnitServices["LevelsService"];

export abstract class Reward {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract Claim(plr: Player, data: DataService, ...args: any[]): void;
}

export class Loot implements Reward {
    public constructor(

    ) {
        // sometime later
    }

    public Claim(plr: Player, data: DataService): void {
        // also sometime later
    }
}

export class XPGain implements Reward {
    public constructor(
        public readonly Increment: number
    ) {}

    public Claim(plr: Player, data: DataService, levels: LevelsService): void {
        levels.AddXP(plr, this.Increment);
    }
}

export namespace Quest {
    export class Predicate {
        public static readonly GoTo = "Go to";
        public static readonly TalkTo = "Talk to";
        public static readonly Interact = "Interact with";
        public static readonly Defeat = "Defeat";
        public static readonly DNC = "Defeat & Collect";
    }

    export class Quest {
        public Completed = false;

        public constructor(
            public readonly Name: string,
            public readonly Predicate: string,
            public readonly Subject: string,
            public readonly Location: string,
            public readonly Goal: Vector3,
            public readonly Rewards: (Loot | XPGain)[]
        ) {}

        public MakeInstructions(): string {
            return `${this.Predicate} ${this.Subject} in ${this.Location}`;
        }
    
        public Complete(plr: Player): void {
            if (this.Completed) return;
            const data = Knit.GetService("DataManager");
            const levels = Knit.GetService("LevelsService");

            for (const reward of this.Rewards) {
                if (reward instanceof XPGain)
                    reward.Claim(plr, data, levels);
                else
                    reward.Claim(plr, data);
            }
            
            const questNumber = data.Get<number>(plr, "questNumber");
            data.Set<number>(plr, "questNumber", questNumber + 1);
            this.Completed = true
        }
    }
}