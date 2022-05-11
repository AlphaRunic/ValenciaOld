-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Debris = TS.import(script, TS.getModule(script, "@rbxts", "services")).Debris
local Assets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").Assets
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local Weld = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Weld").default
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
local inf = _binding.huge
local LevelsService = Knit.CreateService({
	Name = "LevelsService",
	Client = {
		GetXPUntilNext = function(self, plr)
			return self.Server:GetXPUntilNext(plr)
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
		local untilNext = self:GetXPUntilNext(plr)
		if xp >= untilNext then
			local difference = abs(clamp(xp - untilNext, -inf, 0))
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
		local char = plr.Character
		local vfx = Assets.VFX.LevelUp:Clone()
		local root = char.PrimaryPart
		local weld = Weld(root, vfx, false)
		-- weld.C1 = root.CFrame.sub(new Vector3(0, -2));
		vfx.Spiral.Enabled = true
		vfx.Beams.Enabled = true
		vfx.Parent = char
		local vfxTwn = Tweenable.new(weld, 1.8, Enum.EasingStyle.Back, 1)
		local _fn = vfxTwn
		local _object = {}
		local _left = "C1"
		local _c1 = weld.C1
		local _cFrame = CFrame.new(0, -3, 0)
		_object[_left] = _c1 * _cFrame
		_fn:TweenOut(_object).Completed:Connect(function()
			vfx.Spiral.Enabled = false
			vfx.Beams.Enabled = false
			Debris:AddItem(vfx, 4)
		end)
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
	GetXPUntilNext = function(self, plr)
		local stats = GetStatsFor(plr)
		return floor(bit32.bxor(750 + (stats.Level / .3), 2.3))
	end,
})
return LevelsService
