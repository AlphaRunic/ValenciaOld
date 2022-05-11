-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local RunService = _services.RunService
local Input = _services.UserInputService
local conn
local MouseLockController = Knit.CreateController({
	Name = "MouseLockController",
	Toggle = function(self, active)
		if active then
			conn = RunService.RenderStepped:Connect(function()
				Input.MouseBehavior = Enum.MouseBehavior.LockCenter
				return Input.MouseBehavior
			end)
		else
			conn:Disconnect()
			Input.MouseBehavior = Enum.MouseBehavior.Default
		end
	end,
})
return MouseLockController
