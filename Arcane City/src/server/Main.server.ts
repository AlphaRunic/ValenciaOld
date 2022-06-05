import { Component, KnitServer as Knit } from "@rbxts/knit";
import { Exception } from "shared/Internal/Exception";

const modules = (script.Parent!.FindFirstChild('Services') as Folder).GetDescendants();
    for (const module of modules)
        if (module.IsA('ModuleScript')) 
            require(module);

Knit.Start()
    .then(() => Component.Auto(script.Parent!.FindFirstChild('Components') as Folder))
    .catch(e => {
        throw new Exception(e)
    });