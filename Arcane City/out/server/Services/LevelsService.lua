-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local data = Knit.GetService("DataManager")
local function GetStatsFor(plr)
	return data:Get(plr, "gameStats")
end
local function SetStatsFor(plr, newStats)
	data:Set(plr, "gameStats", newStats)
end
local _binding = math
local abs = _binding.abs
local clamp = _binding.clamp
local floor = _binding.floor
local huge = _binding.huge
local LevelsService = Knit.CreateService({
	Name = "LevelsService",
	Client = {
		GetXPUntilNextLevel = function(self, plr)
			return self.Server:GetXPUntilNextLevel(plr)
		end,
		AddXP = function(self, plr, amount)
			self.Server:AddXP(plr, amount)
		end,
		AddLevel = function(self, plr)
			self.Server:AddLevel(plr)
		end,
		GetXP = function(self, plr)
			return self.Server:GetXP(plr)
		end,
		GetLevel = function(self, plr)
			return self.Server:GetLevel(plr)
		end,
		CheckLevelUpAvailability = function(self, plr)
			self.Server:CheckLevelUpAvailability(plr)
		end,
	},
	CheckLevelUpAvailability = function(self, plr)
		local xp = self:GetXP(plr)
		local untilNext = self:GetXPUntilNextLevel(plr)
		if xp >= untilNext then
			local difference = abs(clamp(xp - untilNext, -huge, 0))
			if difference > 0 then
				self:AddXP(plr, difference)
			end
			self:AddLevel(plr)
			self:SetXP(plr, 0)
		end
	end,
	GetXP = function(self, plr)
		local stats = GetStatsFor(plr)
		return stats.XP
	end,
	GetLevel = function(self, plr)
		local stats = GetStatsFor(plr)
		return stats.Level
	end,
	AddLevel = function(self, plr)
		local stats = GetStatsFor(plr)
		stats.Level += 1
		SetStatsFor(plr, stats)
	end,
	AddXP = function(self, plr, amount)
		local stats = GetStatsFor(plr)
		self:SetXP(plr, stats.XP + amount)
		self:CheckLevelUpAvailability(plr)
	end,
	SetXP = function(self, plr, xp)
		local stats = GetStatsFor(plr)
		stats.XP = xp
		SetStatsFor(plr, stats)
	end,
	GetXPUntilNextLevel = function(self, plr)
		local stats = GetStatsFor(plr)
		return floor(bit32.bxor(750 + (stats.Level / .3), 2))
	end,
})
return LevelsService
