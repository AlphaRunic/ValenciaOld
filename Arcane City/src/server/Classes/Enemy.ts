import Location from "./Location";
import RemoveY from "shared/Util/RemoveY";

export default class Enemy {
    public constructor(
        public readonly Model: Model,
        public readonly Spawner: BasePart,
        public readonly Area: Location.Area
    ) {}

    public Teleport(pos: Vector3): void {
        const height: number = this.Model.PrimaryPart.Size.Y;
        const finalPos: Vector3 = RemoveY(pos).add(new Vector3(0, height, 0));
        this.Model.SetPrimaryPartCFrame(new CFrame(finalPos));
    }
}