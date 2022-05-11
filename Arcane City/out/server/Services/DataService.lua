-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Signal = _knit.Signal
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local Data = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Data").Data
local DataStore2 = TS.import(script, TS.getModule(script, "@rbxts", "datastore2").src)
local DataManager = Knit.CreateService({
	Name = "DataManager",
	DataUpdated = Signal.new(),
	Client = {
		DataUpdated = RemoteSignal.new(),
		Get = function(self, plr, name, defaultValue)
			return self.Server:Get(plr, name, defaultValue)
		end,
		Set = function(self, plr, name, value)
			self.Server:Set(plr, name, value)
		end,
	},
	KnitInit = function(self)
		print("[src/server/Services/DataService.ts:29]", "DataService active")
		DataStore2.Combine("DATA", unpack(Data))
	end,
	GetRawStore = function(self, plr, name)
		if RunService:IsStudio() then
			return DataStore2("TEST_" .. name, plr)
		else
			return DataStore2(name, plr)
		end
	end,
	Get = function(self, plr, name, defaultValue)
		local store = self:GetRawStore(plr, name)
		return store:Get(defaultValue)
	end,
	Set = function(self, plr, name, value)
		local store = self:GetRawStore(plr, name)
		store:Set(value)
	end,
	Store = function(self, plr, name, defaultValue)
		local store = DataStore2(name, plr)
		local signal = self.Client.DataUpdated
		local function callRemote(value)
			signal:Fire(plr, name, value)
		end
		callRemote(store:Get(defaultValue))
		store:OnUpdate(callRemote)
		return store
	end,
})
return DataManager
