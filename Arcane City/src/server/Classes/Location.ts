namespace Location {
    export class Area {
        public constructor(
            public readonly Name: string
        ) {}
    }

    export class World extends Area {
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
}

export = Location;