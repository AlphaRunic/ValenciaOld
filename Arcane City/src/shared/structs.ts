import { ReplicatedFirst } from "@rbxts/services";

export const Assets = ReplicatedFirst.Assets;

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
}

export class ShopItem {
    public Viewport: ViewportFrame & { Title: TextLabel; };
    
    public constructor(
        public readonly Name: string,
        public readonly Description: string,
        public readonly Price: number,
        private readonly ItemMesh: MeshPart
    ) {}

    public AssignViewport(viewport: ViewportFrame & { Title: TextLabel; }): void {
        this.Viewport = viewport;
        this.Viewport.Name = this.Name;
        this.Viewport.Title.Text = this.Name;
        this.ItemMesh.Parent = viewport;

        const cam = new Instance("Camera");
        cam.CFrame = new CFrame(this.ItemMesh.Position.add(new Vector3(0, 0, -5)), this.ItemMesh.Position);
        cam.Parent = viewport;
        viewport.CurrentCamera = cam;
    }
}

const items = Assets.ShopItems;
export const ShopItems: ShopItem[] = [
    new ShopItem("Basic Sword", "A sharp blade, perfect for combat.", 500, items.BasicSword)
];

export class UI {
    public static GetMain(plr: Player): PlayerGui["Main"] {
        return plr.WaitForChild("PlayerGui").WaitForChild("Main", 10) as PlayerGui["Main"];
    }
}