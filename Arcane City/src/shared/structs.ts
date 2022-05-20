import { Players, ReplicatedFirst } from "@rbxts/services";
import WaitFor from "./Util/WaitFor";

export const Assets = ReplicatedFirst.Assets;
export type ItemCategory = "Weapons" | "Hats" | "Robes" | "Boots" | "Charms";

export class CharStats {
    public Damage = 0;
    public Resist = 0;
    public Health = 600;
    public MaxHealth = 600;
}

export class GameStats {
    public XP = 0;
    public Level = 1;
    public CharacterStats = new CharStats;
    public OwnedItems: ShopItem[] = [];
    public EquippedItems: ShopItem[] = [];
    public LastLocation: Vector3;
}

const items = Assets.ShopItems;
export class ShopItem<R extends Model = Model> {
    public Viewport: ViewportFrame & { Title: TextLabel; };
    
    public constructor(
        public readonly Name: string,
        public readonly Description: string,
        public readonly Price: number,
        public readonly Category: ItemCategory
    ) {}

    public AssignViewport(viewport: ViewportFrame & { Title: TextLabel; }): void {
        const ref = WaitFor<R>(items, this.Name);
        const mesh = WaitFor<MeshPart>(ref, "Mesh").Clone();
        this.Viewport = viewport;
        this.Viewport.Name = this.Name;
        this.Viewport.Title.Text = this.Name;
        mesh.Parent = viewport;

        const cam = new Instance("Camera");
        cam.CFrame = new CFrame(mesh.Position.add(new Vector3(0, 0, -5)), mesh.Position);
        cam.Parent = viewport;
        viewport.CurrentCamera = cam;
    }
}

export const ShopItems: ShopItem[] = [
    new ShopItem("Iron Sword", "A sharp blade, perfect for combat.", 500, "Weapons")
];

export class UI {
    public static Main(plr: Player = Players.LocalPlayer): PlayerGui["Main"] {
        return plr.WaitForChild("PlayerGui").WaitForChild("Main", 10) as PlayerGui["Main"];
    }
}