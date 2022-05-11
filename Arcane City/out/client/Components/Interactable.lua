-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable prefer-const
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Assets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").Assets
local _class
do
	local Interactable = setmetatable({}, {
		__tostring = function()
			return "Interactable"
		end,
	})
	Interactable.__index = Interactable
	function Interactable.new(...)
		local self = setmetatable({}, Interactable)
		return self:constructor(...) or self
	end
	function Interactable:constructor(hitbox)
		local _arg0 = hitbox:IsA("BasePart")
		assert(_arg0)
		print("[src/client/Components/Interactable.ts:11]", "InteractableComponent modifying: " .. hitbox.Name)
		local _exp = hitbox.Name
		repeat
			local _fallthrough = false
			if _exp == "Shop" then
				local marker = Assets.InteractableMarker:Clone()
				marker.CFrame = CFrame.lookAt(Vector3.new(hitbox.Position.X, 4, hitbox.Position.Z), hitbox.CFrame.LookVector)
				marker.Parent = hitbox
			end
		until true
		local shop = Knit.GetController("ShopController")
		local quests = Knit.GetService("QuestService")
		local location = Knit.GetService("LocationService")
		local touchDB = false
		hitbox.Touched:Connect(function(hit)
			if touchDB then
				return nil
			end
			local _humanoid = hit.Parent
			if _humanoid ~= nil then
				_humanoid = _humanoid:FindFirstChildOfClass("Humanoid")
			end
			local humanoid = _humanoid
			if humanoid then
				touchDB = true
				local currentQuest = quests:GetCurrentQuest()
				local _exp_1 = hitbox.Name
				repeat
					if _exp_1 == "CommonEntrance" then
						local exit = (hitbox:WaitForChild("Exit")).Value
						location:Teleport(exit)
						touchDB = false
						break
					end
					if _exp_1 == "Shop" then
						shop:Toggle(true)
						local conn
						conn = shop.Toggled:Connect(function(active)
							if not active then
								task.wait(2.5)
								conn:Disconnect()
								touchDB = false
							end
						end)
						break
					end
					if _exp_1 == "Crystal" then
						local _result = currentQuest
						if _result ~= nil then
							_result = _result.Name
						end
						if _result == "What's This?" then
							quests:CompleteCurrent()
							hitbox:Destroy()
							touchDB = false
						end
						break
					end
					warn("[src/client/Components/Interactable.ts:62]", "Unhandled interactable case on hitbox named: " .. hitbox.Name)
				until true
			end
		end)
	end
	function Interactable:Destroy()
	end
	Interactable.Tag = "Interactable"
	_class = Interactable
end
return _class
