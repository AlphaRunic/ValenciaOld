-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local CombatModeController = Knit.CreateController({
	Name = "CombatModeController",
	KnitStart = function(self)
		local combat = Knit.GetService("CombatService")
		combat.Began:Connect(function(plr, enemy, battleArea) end)
	end,
})
return CombatModeController
