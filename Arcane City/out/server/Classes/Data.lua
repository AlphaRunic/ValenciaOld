-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local Data = RunService:IsStudio() and { "TEST_gold", "TEST_gems", "TEST_questNumber", "TEST_gameStats" } or { "gold", "gems", "questNumber", "gameStats" }
return {
	Data = Data,
}
