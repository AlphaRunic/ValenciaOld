-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local CharacterLockService = Knit.CreateService({
	Name = "CharacterLockService",
	Client = {
		Toggle = function(self, plr, active)
			self.Server:Toggle(plr, active)
		end,
	},
	Toggle = function(self, plr, active)
		for _, part in ipairs(plr.Character:GetChildren()) do
			if part:IsA("BasePart") then
				part.Anchored = active
			end
		end
	end,
})
return CharacterLockService
