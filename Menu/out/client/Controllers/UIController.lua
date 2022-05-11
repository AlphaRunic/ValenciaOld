-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local StarterGui = _services.StarterGui
local TeleportService = _services.TeleportService
local Workspace = _services.Workspace
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local _structs = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs")
local Assets = _structs.Assets
local UI = _structs.UI
local menu = UI:GetMain(Player)
local main = menu.Main
local _binding = main
local Play = _binding.Play
local Exit = _binding.Exit
local Options = _binding.Options
local UIController = Knit.CreateController({
	Name = "UIController",
	KnitInit = function(self)
		StarterGui:SetCoreGuiEnabled("All", false)
		Workspace.CurrentCamera.CameraType = Enum.CameraType.Scriptable
		Workspace.CurrentCamera.CFrame = (Workspace:WaitForChild("Cam", 10)).CFrame
	end,
	KnitStart = function(self)
		local loadScreen = Knit.GetController("LoadScreenController")
		local hoverColor = Knit.GetController("HoverColorController")
		hoverColor:Enable({ Play, Exit, Options }, Color3.fromRGB(156, 79, 79))
		Play.MouseButton1Click:Connect(function()
			loadScreen:Toggle(true)
			TeleportService:Teleport(8045769892, Player, nil, Assets.LoadScreen)
		end)
	end,
})
return UIController
