import { RunService } from "@rbxts/services";

export const Data = RunService.IsStudio()?
    ["TEST_gold", "TEST_gems", "TEST_questNumber", "TEST_gameStats"]
    :["gold", "gems", "questNumber", "gameStats"];