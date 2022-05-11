import { Component, KnitClient as Knit } from "@rbxts/knit";

const modules = (script.Parent!.FindFirstChild('Controllers') as Folder).GetDescendants();
for (const module of modules)
    if (module.IsA('ModuleScript'))
        require(module);

Knit.Start()
    .then(() => 
        Component.Auto(script.Parent!.FindFirstChild('Components') as Folder))
    .catch(warn);