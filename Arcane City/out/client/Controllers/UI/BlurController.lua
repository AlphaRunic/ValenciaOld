-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Lighting = TS.import(script, TS.getModule(script, "@rbxts", "services")).Lighting
local BlurController = Knit.CreateController({
	Name = "BlurController",
	Blur = Instance.new("BlurEffect"),
	Toggle = function(self, active)
		self.Blur.Enabled = active
	end,
	KnitInit = function(self)
		print("[src/client/Controllers/UI/BlurController.ts:20]", "BlurController active")
		self.Blur.Enabled = false
		self.Blur.Parent = Lighting
	end,
})
return BlurController
