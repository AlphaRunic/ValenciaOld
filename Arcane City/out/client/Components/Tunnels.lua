-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local Tunnels
do
	Tunnels = setmetatable({}, {
		__tostring = function()
			return "Tunnels"
		end,
	})
	Tunnels.__index = Tunnels
	function Tunnels.new(...)
		local self = setmetatable({}, Tunnels)
		return self:constructor(...) or self
	end
	function Tunnels:constructor(tunnel)
		self.TweenTime = 2.5
		self.TweenStyle = Enum.EasingStyle.Sine
		self.GateOffset = Vector3.new(0, 9, 0)
		local _arg0 = tunnel:IsA("Model")
		assert(_arg0)
		print("[src/client/Components/Tunnels.ts:14]", "TunnelsComponent modifying: " .. tunnel.Name)
		local closedByDefault = tunnel:GetAttribute("ClosedByDefault")
		local openQuest = tunnel:GetAttribute("OpenQuest")
		local defaultPos = tunnel.PrimaryPart.Position
		if not closedByDefault then
			self:OpenGate(tunnel, defaultPos)
		else
			self:CloseGate(tunnel, defaultPos)
		end
		local quests = Knit.GetService("QuestService")
		if openQuest <= quests:GetCurrentQuestNumber() then
			self:OpenGate(tunnel, defaultPos)
		end
		quests.Completed:Connect(function(idx)
			if openQuest <= idx + 1 then
				self:OpenGate(tunnel, defaultPos)
			end
		end)
	end
	function Tunnels:CloseGate(tunnel, defaultPos)
		local closed = tunnel:GetAttribute("Closed")
		if closed then
			return nil
		end
		tunnel:SetAttribute("Closed", true)
		local gate = Tweenable.new(tunnel.PrimaryPart, self.TweenTime, self.TweenStyle)
		gate:Tween({
			Position = defaultPos,
		})
	end
	function Tunnels:OpenGate(tunnel, defaultPos)
		local closed = tunnel:GetAttribute("Closed")
		local closedByDefault = tunnel:GetAttribute("ClosedByDefault")
		if not closed and closedByDefault then
			return nil
		end
		tunnel:SetAttribute("Closed", false)
		local gate = Tweenable.new(tunnel.PrimaryPart, self.TweenTime, self.TweenStyle)
		local _fn = gate
		local _object = {}
		local _left = "Position"
		local _gateOffset = self.GateOffset
		_object[_left] = defaultPos + _gateOffset
		_fn:Tween(_object)
	end
	function Tunnels:Destroy()
	end
	Tunnels.Tag = "Tunnel"
end
return Tunnels
