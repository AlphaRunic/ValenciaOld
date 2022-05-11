-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local areaSpawns = Workspace.AreaSpawns
local Location = {}
do
	local _container = Location
	local LocationBase
	do
		LocationBase = setmetatable({}, {
			__tostring = function()
				return "LocationBase"
			end,
		})
		LocationBase.__index = LocationBase
		function LocationBase.new(...)
			local self = setmetatable({}, LocationBase)
			return self:constructor(...) or self
		end
		function LocationBase:constructor(Name)
			self.Name = Name
		end
	end
	local World
	do
		local super = LocationBase
		World = setmetatable({}, {
			__tostring = function()
				return "World"
			end,
			__index = super,
		})
		World.__index = World
		function World.new(...)
			local self = setmetatable({}, World)
			return self:constructor(...) or self
		end
		function World:constructor(name, CommonArea, Areas)
			super.constructor(self, name)
			self.CommonArea = CommonArea
			self.Areas = Areas
		end
		function World:GetArea(name)
			for _, a in ipairs(self.Areas) do
				if a.Name == name then
					return a
				end
			end
		end
	end
	_container.World = World
	local Area
	do
		local super = LocationBase
		Area = setmetatable({}, {
			__tostring = function()
				return "Area"
			end,
			__index = super,
		})
		Area.__index = Area
		function Area.new(...)
			local self = setmetatable({}, Area)
			return self:constructor(...) or self
		end
		function Area:constructor(name, SpawnPoint)
			if SpawnPoint == nil then
				SpawnPoint = areaSpawns:WaitForChild(name, 6)
			end
			super.constructor(self, name)
			self.SpawnPoint = SpawnPoint
		end
	end
	_container.Area = Area
end
return Location
