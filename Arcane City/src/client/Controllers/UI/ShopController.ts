/* eslint-disable @typescript-eslint/no-explicit-any */
import { KnitClient as Knit, Signal } from "@rbxts/knit";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Assets, GameStats, ShopItem, ShopItems, UI } from "shared/structs";
import { $print } from "rbxts-transform-debug";
import Tweenable from "shared/Util/Tweenable";
import FormatInt from "shared/Util/FormatInt";
import { RunService } from "@rbxts/services";

declare global {
    interface KnitControllers {
        ShopController: typeof ShopController;
    }
}
 
const main = UI.GetMain(Player);
const shop = main.Interactions.Shop;
const display = shop.ItemDisplay;
const purchaseItem = display.Shadow.Purchase;
const itemIcon = display.Shadow.ItemIcon;
const description = display.Shadow.Description;
const price = itemIcon.Price;

const style = Enum.EasingStyle.Sine;
const animTime = .3;
const displayFrame = new Tweenable<Frame>(display, animTime, style);
const displayShadow = new Tweenable<Frame>(display.Shadow, animTime, style);
const window = new Tweenable<Frame>(shop.Window, animTime, style);
const displayOpenPos = <UDim2>display.GetAttribute("OpenPos");
const shadowOpenPos = <UDim2>display.Shadow.GetAttribute("OpenPos");
const windowOpenPos = <UDim2>shop.Window.GetAttribute("OpenPos");
const displayClosedPos = <UDim2>display.GetAttribute("ClosedPos");
const shadowClosedPos = <UDim2>display.Shadow.GetAttribute("ClosedPos");
const windowClosedPos = <UDim2>shop.Window.GetAttribute("ClosedPos");

const ShopController = Knit.CreateController({
    Name: "ShopController",

    Toggled: new Signal<(active: boolean) => void>(),
    DisplayStateChanged: new Signal<(displayActive: boolean, selectedItem: ShopItem) => void>(),

    Toggle(active: boolean): void {
        this.Toggled.Fire(active);
        shop.Visible = active;
        main.Game.Visible = !active;
        displayFrame.TweenOut({ Position: displayClosedPos });
        displayShadow.TweenOut({ Position: shadowClosedPos });
        window.TweenOut({ Position: windowClosedPos });
    },
        
    KnitStart(): void {
        $print("ShopController active");
        const data = Knit.GetService("DataManager");
        const charLock = Knit.GetService("CharacterLockService");
        const quests = Knit.GetService("QuestService");
        const mouseLock = Knit.GetController("MouseLockController");
        const blur = Knit.GetController("BlurController");
        
        shop.Window.Close.MouseButton1Click.Connect(() => this.Toggle(false));
        this.Toggled.Connect(active => {
            charLock.Toggle(active);
            blur.Toggle(active);
            mouseLock.Toggle(!active);
        });
        
        let displayOpen = false;
        let purchaseConn: RBXScriptConnection;
        let spinConn: RBXScriptConnection;
        this.DisplayStateChanged.Connect((active, selectedItem) => {
            displayOpen = active;
            purchaseConn?.Disconnect();
            
            const stats = <GameStats>data.Get("gameStats");
            if (stats.OwnedItems.map(i => i.Name).includes(selectedItem.Name))
                purchaseItem.Text = "Purchased";
            else
                purchaseItem.Text = "Purchase";

            const mesh = selectedItem.Viewport.FindFirstChildOfClass("MeshPart").Clone();
            if (active) {
                mesh.Parent = itemIcon;
                spinConn = RunService.Heartbeat.Connect(() => mesh.CFrame = mesh.CFrame.mul(CFrame.Angles(math.rad(1), 0, math.rad(1))));
                displayFrame.TweenIn({ Position: displayOpenPos });
                displayShadow.TweenIn({ Position: shadowOpenPos });
                window.TweenIn({ Position: windowOpenPos });
            } else {
                spinConn.Disconnect();
                itemIcon.FindFirstChildOfClass("MeshPart").Destroy();
                displayFrame.TweenOut({ Position: displayClosedPos });
                displayShadow.TweenOut({ Position: shadowClosedPos });
                window.TweenOut({ Position: windowClosedPos });
            }

            itemIcon.CurrentCamera = selectedItem.Viewport.CurrentCamera;
            description.Text = selectedItem.Description;
            price.Text = FormatInt(selectedItem.Price);
            purchaseConn = purchaseItem.MouseButton1Click.Connect(() => {
                if (stats.OwnedItems.map(i => i.Name).includes(selectedItem.Name)) return;

                const gold = <number>data.Get("gold");
                if (gold >= selectedItem.Price) {
                    const stats = <GameStats>data.Get("gameStats");
                    stats.OwnedItems.push(selectedItem);
                    data.Set("gameStats", stats);
                    purchaseItem.Text = "Purchased";

                    data.Set("gold", gold - selectedItem.Price);
                    const currentQuest = quests.GetCurrentQuest();
                    if (currentQuest?.Name === "Initiation") {
                        stats.EquippedItems.push(selectedItem);
                        data.Set("gameStats", stats);
                        quests.CompleteCurrent();
                    }
                }
            });
        });

        let lastItem: ViewportFrame | undefined;
        const inputType = Enum.UserInputType;
        for (const item of ShopItems) {
            const viewport = Assets.UI.ShopItem.Clone();
            viewport.Parent = shop.Window.List;
            item.AssignViewport(viewport);
            
            const itemTitle = new Tweenable(viewport.Title, .25, style);
            const openPos = <UDim2>viewport.Title.GetAttribute("OpenPos");
            const closedPos = <UDim2>viewport.Title.GetAttribute("ClosedPos");
            
            viewport.MouseEnter.Connect(() => itemTitle.Tween({ Position: openPos }));
            viewport.MouseLeave.Connect(() => itemTitle.Tween({ Position: closedPos }));
            viewport.InputBegan.Connect(io => {
                if (io.UserInputType === inputType.MouseButton1) {
                    if (lastItem! === viewport && displayOpen)
                        this.DisplayStateChanged.Fire(false, item);
                    else if (lastItem === undefined || !displayOpen)
                        this.DisplayStateChanged.Fire(true, item);

                    lastItem = viewport;
                }
            });
        }
    }
});

export = ShopController;