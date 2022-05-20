import { KnitClient as Knit } from "@rbxts/knit";
import { RunService as Runtime, Workspace } from "@rbxts/services";
import { Player } from "@rbxts/knit/Knit/KnitClient";
import { Assets } from "shared/structs";
import RemoveY from "shared/Util/RemoveY";

declare global {
    interface KnitControllers {
        QuestArrowController: typeof QuestArrowController;
    }
}

const arrowModel = Assets.QuestHelper;
let arrow: typeof arrowModel;
let arrowFrame: typeof arrowModel.Distance.Frame;

let pointConn: RBXScriptConnection;

const { rad, floor, abs } = math;

function UpdateDistanceText(text: string): void {
    arrowFrame!.Distance.Text = text;
}

function AddArrow(): void {
    arrow = arrowModel.Clone();
    arrowFrame = arrow.Distance.Frame;
    arrow.Size = arrow.Size.Unit.mul(4)
    arrow.Parent = Workspace.CurrentCamera;
    UpdateDistanceText("---");
}

const QuestArrowController = Knit.CreateController({
    Name: "QuestArrowController",

    PointTo(target: Vector3): void {
        const char: Model = Player.Character;
        const head = <BasePart>char.WaitForChild("Head");
        const root: BasePart = char.PrimaryPart;

        AddArrow()
        pointConn = Runtime.RenderStepped.Connect(dt => {
            const diff: Vector3 = RemoveY(root.Position.sub(target));
            const base: CFrame = head.CFrame.add(new Vector3(0, 4, 0));
            arrow.Position = base.Position;
            arrow.CFrame = arrow.CFrame.Lerp(
                CFrame
                    .lookAt(arrow.Position, new Vector3(target.X, base.Y, target.Z))
                    .mul(CFrame.Angles(rad(-90), rad(180), 0)),
                .15
            );

            const dist: number = floor(abs(diff.Magnitude));
            UpdateDistanceText(tostring(dist));
        });
    },

    StopPointing(): void {
        pointConn?.Disconnect();
        arrow?.Destroy();
    },

    KnitInit(): void {
        print("QuestArrowController active");
    }
});

export = QuestArrowController;