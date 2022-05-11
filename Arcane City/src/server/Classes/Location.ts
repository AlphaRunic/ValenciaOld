import { Workspace } from "@rbxts/services";

const areaSpawns = Workspace.AreaSpawns;
namespace Location {
    class LocationBase {
        public constructor(
            public readonly Name: string
        ) {}
    }

    export class World extends LocationBase {
        public constructor(
            name: string,
            public readonly CommonArea: Area,
            public readonly Areas: Area[]
        ) {
            super(name);
        }

        public GetArea(name: string): Area {
            for (const a of this.Areas)
                if (a.Name === name)
                    return a;
        }
    }

    export class Area extends LocationBase {
        public constructor(
            name: string,
            public readonly SpawnPoint = <BasePart>areaSpawns.WaitForChild(name, 6)
        ) {
            super(name);
        }
    }
}

export = Location;