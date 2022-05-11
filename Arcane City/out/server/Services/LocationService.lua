-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable roblox-ts/lua-truthiness
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Signal = _knit.Signal
local TeleportService = TS.import(script, TS.getModule(script, "@rbxts", "services")).TeleportService
local Worlds = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Worlds").default
local Assets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").Assets
local LocationService = Knit.CreateService({
	Name = "LocationService",
	Teleported = Signal.new(),
	PlaceTeleported = Signal.new(),
	Client = {
		Teleported = RemoteSignal.new(),
		PlaceTeleported = RemoteSignal.new(),
		Teleport = function(self, plr, spawnPoint)
			self.Server:Teleport(plr, spawnPoint)
		end,
		GoTo = function(self, plr, areaName, worldName)
			self.Server:GoTo(plr, areaName, worldName)
		end,
		PlaceTeleport = function(self, plr, placeId)
			self.Server:PlaceTeleport(plr, placeId)
		end,
	},
	PlaceTeleport = function(self, plr, placeId)
		self.Client.PlaceTeleported:Fire(plr)
		TeleportService:Teleport(placeId, plr, nil, Assets.UI.LoadScreen)
	end,
	Teleport = function(self, plr, spawnPoint)
		local root = plr.Character.PrimaryPart
		local _cFrame = spawnPoint.CFrame
		local _arg0 = spawnPoint.CFrame.LookVector * 5
		root.CFrame = _cFrame + _arg0
		self.Client.Teleported:Fire(plr)
	end,
	GoTo = function(self, plr, worldName, areaName)
		local world = Worlds:Get(worldName)
		local area = areaName ~= "" and areaName and world:GetArea(areaName) or world.CommonArea
		self:Teleport(plr, area.SpawnPoint)
	end,
})
return LocationService
