import { KnitClient as Knit, Signal } from "@rbxts/knit";
import { ReplicatedFirst } from "@rbxts/services";
import { Exception } from "shared/Internal/Exception";
import { UI, ItemCategory, ShopItem } from "shared/structs";
import AnimatedButton from "shared/Util/AnimatedButton";
import Tweenable from "shared/Util/Tweenable";
import StrictMap from "shared/Util/StrictMap";
import WaitFor from "shared/Util/WaitFor";

declare global {
    interface KnitControllers {
        InventoryController: typeof InventoryController;
    }
}

interface Required {
    Blur?: typeof Knit.Controllers["BlurController"];
    MouseLock?: typeof Knit.Controllers["MouseLockController"];
}

const req: Required = {};
const assets = ReplicatedFirst.Assets;
const main = UI.Main();
const backpack = main.Interactions.Backpack;
const categoryStorage = backpack.ItemStorage;
const map = new StrictMap<ItemCategory, ShopItem[]>([
    ["Weapons", []],
    ["Hats", []],
    ["Robes", []],
    ["Boots", []],
    ["Charms", []],
]);

let selectedItemBtn: TextButton;
let storage: ShopItem[];

const InventoryController = Knit.CreateController({
    Name: "InventoryController",
    Categorized: new Signal<() => void>(),
    Equipped: new Signal<(selectedBtn: TextButton) => void>(),

    Update(inv: ShopItem[]): void {
        this.Categorize(inv);
        this.CreateButtons(inv);
        storage = inv;
    },

    Toggle(): void {
        main.Game.Visible = !main.Game.Visible;
        backpack.Visible = !backpack.Visible;
        req.Blur!.Toggle();
        req.MouseLock!.Toggle(!backpack.Visible);
    },

    Categorize(inv: ShopItem[]): void {
        for (const i of inv) {
            const list = map.Get(i.Category);
            list.push(i);
            map.Set(i.Category, list);
        }
        this.Categorized.Fire();
    },

    CreateButtons(items: ShopItem[]): TextButton[] {
        const btns = items.map(i => {
            const b =  assets.UI.BackpackItem.Clone();
            const spd = .1
            const btn = new Tweenable(b, spd, Enum.EasingStyle.Quad);
            const animator = new AnimatedButton(b);
            b.Name = i.Name;
            b.Text = i.Name;

            const inc = new UDim2(.1, 0, 0, 0);
            const defaultSize = b.Size;
            const selectedColor = Color3.fromRGB(117, 38, 38);
            const defaultColor = Color3.fromRGB(83, 2, 0);
            animator.HoverColor<TextButton>(Color3.fromRGB(135, 1, 0), defaultColor, spd * 1.5);
            b.MouseEnter.Connect(() => btn.Tween({ Size: defaultSize.add(inc) }));
            b.MouseLeave.Connect(() => btn.Tween({ Size: defaultSize.sub(inc) }));
            b.MouseButton1Click.Connect(() => {
                if (selectedItemBtn && selectedItemBtn !== b)
                    selectedItemBtn.BackgroundColor3 = defaultColor;

                selectedItemBtn = b;
                b.BackgroundColor3 = selectedColor;
            });
            return b;
        });

        map.ForEach((list, category) => {
            const categorized = btns.filter(b => this.GetCategory(list, b.Name) === category);
            const parent = WaitFor<Folder>(categoryStorage, category);
            for (const btn of categorized) {
                const existingBtn = btn.FindFirstChild(btn.Name);
                if (existingBtn)
                    existingBtn.Destroy();

                btn.Parent = parent;
            }
        });

        return btns;
    },

    GetStorage(): ShopItem[] {
        return storage?? [];
    },

    GetCategory(inv: ShopItem[], itemName: string): ItemCategory | undefined {
        const item = inv.find(i => i.Name === itemName);
        return item?.Category;
    },

    SwitchCategory(name: ItemCategory): void {
        backpack.Items.GetChildren()
            .filter(b => b.IsA("TextButton"))
            .forEach(b => {
                const category = this.GetCategory(storage, b.Name);
                if (category)
                    b.Parent = WaitFor<Folder>(categoryStorage, category);
                else
                    throw new Exception("Could not find category for inventory item '" + b.Name + "'");
            });
        
        const category = WaitFor<Folder>(categoryStorage, name);
        for (const btn of category.GetChildren())
            btn.Parent = backpack.Items;
    },

    ConnectCategoryBtns(pop: number, spd: number): void {
        const categories = <ImageButton[]>backpack.Categories.GetChildren().filter(b => b.IsA("ImageButton"));
        for (const categoryBtn of categories) {
            const folder = new Instance("Folder");
            folder.Name = categoryBtn.Name;
            folder.Parent = categoryStorage;

            const category = new AnimatedButton(categoryBtn);
            category.HoverPop(pop, spd)
                .ClickPop(pop, spd);

            categoryBtn.MouseButton1Click.Connect(() => this.SwitchCategory(<ItemCategory>categoryBtn.Name));
        }
    },

    ConnectActionBtns(pop: number, spd: number): void {
        for (const btn of backpack.Actions.GetChildren())
            if (btn.IsA("GuiButton")) {
                const b = new AnimatedButton(btn);
                b.HoverPop(pop, spd)
                    .ClickPop(pop, spd);

                btn.MouseButton1Click.Connect(() => {
                    switch(btn.Name) {
                        case "Equip": 
                            this.Equipped.Fire(selectedItemBtn);
                            break;
                        case "Trash":
                            // this.Trashed.Fire(selectedItemBtn);
                            break;
                        default:
                            warn("Unhandled action button named '" + btn.Name + "'");
                    }
                });
            }        
    },

    ConnectNavigationBtns(pop: number, spd: number): void {
        for (const btn of backpack.Navigation.GetChildren())
            if (btn.IsA("GuiButton")) {
                const b = new AnimatedButton(btn);
                b.HoverPop(pop, spd)
                    .ClickPop(pop, spd);

                btn.MouseButton1Click.Connect(() => {
                    switch(btn.Name) {
                        case "Close": 
                            this.Toggle();
                            break;
                        case "Help":
                            break;
                        case "Settings":
                            break;
                        default:
                            warn("Unhandled action button named '" + btn.Name + "'");
                    }
                });
            }        
    },


    KnitStart(): void {
        print("InventoryController active");
        let conn: Signal.Connection;
        conn = this.Categorized.Connect(() => {
            this.SwitchCategory("Weapons");
            conn.Disconnect();
        });

        req.Blur = Knit.GetController("BlurController");
        req.MouseLock = Knit.GetController("MouseLockController");
        const pop = 4, spd = .12;
        this.ConnectCategoryBtns(pop, spd);
        this.ConnectActionBtns(pop, spd);
        this.ConnectNavigationBtns(pop, spd)

        const input = Knit.GetController("InputController");
        const key = Enum.KeyCode;
        const inputState = Enum.UserInputState;
        input.Bind("ToggleInv", (name, state) => {
            if (state === inputState.Begin)
                this.Toggle();
        }, false, key.B);
    }
});

export = InventoryController;