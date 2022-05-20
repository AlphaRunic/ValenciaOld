import { Component, KnitClient as Knit } from "@rbxts/knit";
import Tweenable from "shared/Util/Tweenable";

class Tunnels implements Component.ComponentClass {
    public static Tag = "Tunnel";

    private readonly TweenTime = 2.5;
    private readonly TweenStyle = Enum.EasingStyle.Sine;
    private readonly GateOffset = new Vector3(0, 9, 0);

    constructor(tunnel: Instance) {
        assert(tunnel.IsA("Model"));
        print("TunnelsComponent modifying: " + tunnel.Name);
        
        const closedByDefault = <boolean>tunnel.GetAttribute("ClosedByDefault");
        const openQuest = <number>tunnel.GetAttribute("OpenQuest");
        const defaultPos = tunnel.PrimaryPart.Position;
        
        if (!closedByDefault)
            this.OpenGate(tunnel, defaultPos);
        else
            this.CloseGate(tunnel, defaultPos);
        
        const quests = Knit.GetService("QuestService");
        if (openQuest <= quests.GetCurrentQuestNumber())
            this.OpenGate(tunnel, defaultPos);

        quests.Completed.Connect(idx => {
            if (openQuest <= idx + 1)
                this.OpenGate(tunnel, defaultPos);
        });
    }

    private CloseGate(tunnel: Model, defaultPos: Vector3): void {
        const closed = <boolean>tunnel.GetAttribute("Closed");
        if (closed) return;
        
        tunnel.SetAttribute("Closed", true);
        const gate = new Tweenable(<UnionOperation>tunnel.PrimaryPart, this.TweenTime, this.TweenStyle);
        gate.Tween({ Position: defaultPos });
    }

    private OpenGate(tunnel: Model, defaultPos: Vector3): void {
        const closed = <boolean>tunnel.GetAttribute("Closed");
        const closedByDefault = <boolean>tunnel.GetAttribute("ClosedByDefault");
        if (!closed && closedByDefault) return;

        tunnel.SetAttribute("Closed", false);
        const gate = new Tweenable(<UnionOperation>tunnel.PrimaryPart, this.TweenTime, this.TweenStyle);
        gate.Tween({ Position: defaultPos.add(this.GateOffset) });
    }

    public Destroy() {}
}

export = Tunnels;