import { KnitServer as Knit } from "@rbxts/knit";
import WaitFor from "shared/Utility/Functions/WaitFor";

for (const v of WaitFor<Folder>(script.Parent!, "Services").GetDescendants())
    if (v.IsA("ModuleScript"))
        require(v);

Knit.Start().catch(warn);