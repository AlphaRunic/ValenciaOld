-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitServer
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local RandomElement = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "RandomElement").default
local MAX_ENEMIES_IN_AREA = 25
local EnemySpawner
do
	EnemySpawner = setmetatable({}, {
		__tostring = function()
			return "EnemySpawner"
		end,
	})
	EnemySpawner.__index = EnemySpawner
	function EnemySpawner.new(...)
		local self = setmetatable({}, EnemySpawner)
		return self:constructor(...) or self
	end
	function EnemySpawner:constructor(spawner)
		local _arg0 = spawner:IsA("BasePart")
		assert(_arg0)
		print("[src/server/Components/EnemySpawner.ts:13]", "EnemySpawnerComponent modifying: " .. spawner.Name .. " in " .. spawner.Parent.Name)
		local enemy = Knit.GetService("EnemyService")
		local storageFull = false
		task.spawn(function()
			while true do
				task.wait(1)
				if storageFull then
					return nil
				end
				local _exp = spawner.Enemies:GetChildren()
				local _arg0_1 = function(i)
					return i.Name
				end
				-- ▼ ReadonlyArray.map ▼
				local _newValue = table.create(#_exp)
				for _k, _v in ipairs(_exp) do
					_newValue[_k] = _arg0_1(_v, _k - 1, _exp)
				end
				-- ▲ ReadonlyArray.map ▲
				local enemyList = _newValue
				local e = enemy:Create(RandomElement(enemyList), spawner)
				local storageUnit = self:SpawnEnemy(e, spawner)
				if #storageUnit:GetChildren() == MAX_ENEMIES_IN_AREA then
					storageFull = true
				else
					storageFull = false
				end
			end
		end)
	end
	function EnemySpawner:SpawnEnemy(e, spawner)
		if e.Spawner == spawner then
			local pos = spawner.Position
			local size = spawner.Size
			local rng = Random.new()
			local x = rng:NextInteger(pos.X - (size.X / 2), pos.X + (size.X / 2))
			local z = rng:NextInteger(pos.Z - (size.Z / 2), pos.Z + (size.Z / 2))
			e:Teleport(Vector3.new(x, 0, z))
			local storageUnit = self:GetStorageUnit(e)
			e.Model.Parent = storageUnit
			return storageUnit
		end
	end
	function EnemySpawner:GetStorageUnit(e)
		return Workspace.EnemyStorage:FindFirstChild(e.Area.Name)
	end
	function EnemySpawner:Destroy()
	end
	EnemySpawner.Tag = "EnemySpawner"
end
return EnemySpawner
