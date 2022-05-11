-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _Location = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Location")
local Area = _Location.Area
local World = _Location.World
local Worlds
do
	Worlds = setmetatable({}, {
		__tostring = function()
			return "Worlds"
		end,
	})
	Worlds.__index = Worlds
	function Worlds.new(...)
		local self = setmetatable({}, Worlds)
		return self:constructor(...) or self
	end
	function Worlds:constructor()
	end
	function Worlds:Get(worldName)
		for _, w in ipairs(self.list) do
			if w.Name == worldName then
				return w
			end
		end
	end
	Worlds.list = { World.new("Arcane City", Area.new("Central Park"), { Area.new("Minotaur Alley") }) }
end
return {
	default = Worlds,
}
