-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Reward
do
	Reward = {}
	function Reward:constructor()
	end
end
local Loot
do
	Loot = setmetatable({}, {
		__tostring = function()
			return "Loot"
		end,
	})
	Loot.__index = Loot
	function Loot.new(...)
		local self = setmetatable({}, Loot)
		return self:constructor(...) or self
	end
	function Loot:constructor()
	end
	function Loot:Claim(plr, data)
	end
end
local XPGain
do
	XPGain = setmetatable({}, {
		__tostring = function()
			return "XPGain"
		end,
	})
	XPGain.__index = XPGain
	function XPGain.new(...)
		local self = setmetatable({}, XPGain)
		return self:constructor(...) or self
	end
	function XPGain:constructor(Increment)
		self.Increment = Increment
	end
	function XPGain:Claim(plr, data, levels)
		levels:AddXP(plr, self.Increment)
	end
end
local Quest = {}
do
	local _container = Quest
	local Predicate
	do
		Predicate = setmetatable({}, {
			__tostring = function()
				return "Predicate"
			end,
		})
		Predicate.__index = Predicate
		function Predicate.new(...)
			local self = setmetatable({}, Predicate)
			return self:constructor(...) or self
		end
		function Predicate:constructor()
		end
		Predicate.GoTo = "Go to"
		Predicate.TalkTo = "Talk to"
		Predicate.Interact = "Interact with"
		Predicate.Defeat = "Defeat"
		Predicate.DNC = "Defeat & Collect"
	end
	_container.Predicate = Predicate
	local Quest
	do
		Quest = setmetatable({}, {
			__tostring = function()
				return "Quest"
			end,
		})
		Quest.__index = Quest
		function Quest.new(...)
			local self = setmetatable({}, Quest)
			return self:constructor(...) or self
		end
		function Quest:constructor(Name, Predicate, Subject, Location, Goal, Rewards)
			self.Name = Name
			self.Predicate = Predicate
			self.Subject = Subject
			self.Location = Location
			self.Goal = Goal
			self.Rewards = Rewards
			self.Completed = false
		end
		function Quest:MakeInstructions()
			return self.Predicate .. (" " .. (self.Subject .. (" in " .. self.Location)))
		end
		function Quest:Complete(plr)
			if self.Completed then
				return nil
			end
			local data = Knit.GetService("DataManager")
			local levels = Knit.GetService("LevelsService")
			for _, reward in ipairs(self.Rewards) do
				if TS.instanceof(reward, XPGain) then
					reward:Claim(plr, data, levels)
				else
					reward:Claim(plr, data)
				end
			end
			local questNumber = data:Get(plr, "questNumber")
			data:Set(plr, "questNumber", questNumber + 1)
			self.Completed = true
		end
	end
	_container.Quest = Quest
end
return {
	Reward = Reward,
	Loot = Loot,
	XPGain = XPGain,
	Quest = Quest,
}
