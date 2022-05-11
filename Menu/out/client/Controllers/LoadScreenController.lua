-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local ui = Player:WaitForChild("PlayerGui", 6)
local loadScreen = ui:WaitForChild("LoadScreen")
local LoadScreenController = Knit.CreateController({
	Name = "LoadScreenController",
	Toggle = function(self, active)
		loadScreen.Enabled = active
	end,
	KnitInit = function(self)
		RunService.RenderStepped:Connect(function()
			local _exp = loadScreen.Wheel
			_exp.Rotation += 2
			return _exp.Rotation
		end)
	end,
})
return LoadScreenController
