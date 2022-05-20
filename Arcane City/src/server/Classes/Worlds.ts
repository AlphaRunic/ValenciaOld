import { Area, World } from "./Location";

export default class Worlds {
    private static list = [
        new World("Arcane City", new Area("Central Park"), [
            new Area("Dark Alley")
        ])
    ];

    public static Get(worldName: string): World {
        for (const w of this.list)
            if (w.Name === worldName)
                return w;
    }
}