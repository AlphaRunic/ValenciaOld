-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Runtime = _services.RunService
local Workspace = _services.Workspace
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local Assets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").Assets
local RemoveY = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "RemoveY").default
local arrowModel = Assets.QuestHelper
local arrow
local arrowFrame
local pointConn
local _binding = math
local rad = _binding.rad
local floor = _binding.floor
local abs = _binding.abs
local function UpdateDistanceText(text)
	arrowFrame.Distance.Text = text
end
local function AddArrow()
	arrow = arrowModel:Clone()
	arrowFrame = arrow.Distance.Frame
	arrow.Size = arrow.Size.Unit * 4
	arrow.Parent = Workspace.CurrentCamera
	UpdateDistanceText("---")
end
local QuestArrowController = Knit.CreateController({
	Name = "QuestArrowController",
	PointTo = function(self, target)
		local char = Player.Character
		local head = char:WaitForChild("Head")
		local root = char.PrimaryPart
		AddArrow()
		pointConn = Runtime.RenderStepped:Connect(function(dt)
			local diff = RemoveY(root.Position - target)
			local _cFrame = head.CFrame
			local _vector3 = Vector3.new(0, 4, 0)
			local base = _cFrame + _vector3
			arrow.Position = base.Position
			local _fn = arrow.CFrame
			local _exp = CFrame.lookAt(arrow.Position, Vector3.new(target.X, base.Y, target.Z))
			local _arg0 = CFrame.Angles(rad(-90), rad(180), 0)
			arrow.CFrame = _fn:Lerp(_exp * _arg0, .15)
			local dist = floor(abs(diff.Magnitude))
			UpdateDistanceText(tostring(dist))
		end)
	end,
	StopPointing = function(self)
		local _result = pointConn
		if _result ~= nil then
			_result:Disconnect()
		end
		local _result_1 = arrow
		if _result_1 ~= nil then
			_result_1:Destroy()
		end
	end,
	KnitInit = function(self)
		print("[src/client/Controllers/QuestArrowController.ts:65]", "QuestArrowController active")
	end,
})
return QuestArrowController
