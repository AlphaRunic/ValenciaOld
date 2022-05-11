-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local GameStats = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").GameStats
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local data = Knit.GetService("DataManager")
local GameService = Knit.CreateService({
	Name = "GameService",
	Client = {
		Initiate = function(self, plr)
			self.Server:Initiate(plr)
		end,
	},
	Initiate = function(self, plr)
		print("[src/server/Services/GameService.ts:23]", "GameService active")
		local defaultData = {
			gold = 500,
			gems = 0,
			questNumber = 1,
			gameStats = GameStats.new(),
		}
		local testData = {
			TEST_gold = 500,
			TEST_gems = 0,
			TEST_questNumber = 1,
			TEST_gameStats = GameStats.new(),
		}
		if RunService:IsStudio() then
			local _arg0 = function(v, k)
				return data:Store(plr, k, v)
			end
			-- ▼ ReadonlyMap.forEach ▼
			for _k, _v in pairs(testData) do
				_arg0(_v, _k, testData)
			end
			-- ▲ ReadonlyMap.forEach ▲
		else
			local _arg0 = function(v, k)
				return data:Store(plr, k, v)
			end
			-- ▼ ReadonlyMap.forEach ▼
			for _k, _v in pairs(defaultData) do
				_arg0(_v, _k, defaultData)
			end
			-- ▲ ReadonlyMap.forEach ▲
		end
	end,
})
return GameService
