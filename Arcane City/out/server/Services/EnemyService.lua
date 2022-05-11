-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable prefer-const
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local Workspace = _services.Workspace
local Assets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").Assets
local Enemy = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Enemy").default
local Worlds = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Worlds").default
local combat = Knit.GetService("CombatService")
local EnemyService = Knit.CreateService({
	Name = "EnemyService",
	Create = function(self, name, spawner)
		local base = Assets.Enemies:FindFirstChild(name)
		local model = base:Clone()
		local worldName = Workspace.EnemySpawns:GetAttribute("WorldName")
		local world = Worlds:Get(worldName)
		local spawnGroup = spawner.Parent
		local area = world:GetArea(spawnGroup.Name)
		local conn
		conn = model:FindFirstChildOfClass("MeshPart").Touched:Connect(function(hit)
			local _humanoid = hit.Parent
			if _humanoid ~= nil then
				_humanoid = _humanoid:FindFirstChildOfClass("Humanoid")
			end
			local humanoid = _humanoid
			if humanoid then
				combat:Begin(Players:GetPlayerFromCharacter(humanoid.Parent), model)
				conn:Disconnect()
			end
		end)
		return Enemy.new(model, spawner, area)
	end,
})
return EnemyService
