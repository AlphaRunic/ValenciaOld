-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Signal = _knit.Signal
local CombatService = Knit.CreateService({
	Name = "CombatService",
	Began = Signal.new(),
	Client = {
		Began = RemoteSignal.new(),
	},
	Begin = function(self, plr, enemy)
		print("[src/server/Services/CombatService.ts:19]", "Combat initiated. " .. plr.Name .. " vs " .. enemy.Name)
		-- this.Client.Began.Fire(plr, enemy);
	end,
})
return CombatService
