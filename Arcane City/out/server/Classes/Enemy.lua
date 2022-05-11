-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RemoveY = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "RemoveY").default
local Enemy
do
	Enemy = setmetatable({}, {
		__tostring = function()
			return "Enemy"
		end,
	})
	Enemy.__index = Enemy
	function Enemy.new(...)
		local self = setmetatable({}, Enemy)
		return self:constructor(...) or self
	end
	function Enemy:constructor(Model, Spawner, Area)
		self.Model = Model
		self.Spawner = Spawner
		self.Area = Area
	end
	function Enemy:Teleport(pos)
		local height = self.Model.PrimaryPart.Size.Y
		local _exp = RemoveY(pos)
		local _vector3 = Vector3.new(0, height, 0)
		local finalPos = _exp + _vector3
		self.Model:SetPrimaryPartCFrame(CFrame.new(finalPos))
	end
end
return {
	default = Enemy,
}
