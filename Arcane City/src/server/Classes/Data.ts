import { RunService } from "@rbxts/services";

const data = ["gold", "crystals", "questNumber", "gameStats"];
export const Data = RunService.IsStudio() ? data.map(k => "TEST_" + k) : data;