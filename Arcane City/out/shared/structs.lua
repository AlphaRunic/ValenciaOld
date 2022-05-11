-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedFirst = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedFirst
local WaitFor = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "WaitFor").default
local Assets = ReplicatedFirst.Assets
local CharStats
do
	CharStats = setmetatable({}, {
		__tostring = function()
			return "CharStats"
		end,
	})
	CharStats.__index = CharStats
	function CharStats.new(...)
		local self = setmetatable({}, CharStats)
		return self:constructor(...) or self
	end
	function CharStats:constructor()
		self.Damage = 0
		self.Resist = 0
		self.Health = 600
		self.MaxHealth = 600
	end
end
local GameStats
do
	GameStats = setmetatable({}, {
		__tostring = function()
			return "GameStats"
		end,
	})
	GameStats.__index = GameStats
	function GameStats.new(...)
		local self = setmetatable({}, GameStats)
		return self:constructor(...) or self
	end
	function GameStats:constructor()
		self.XP = 0
		self.Level = 1
		self.CharacterStats = CharStats.new()
		self.OwnedItems = {}
		self.EquippedItems = {}
	end
end
local items = Assets.ShopItems
local ShopItem
do
	ShopItem = setmetatable({}, {
		__tostring = function()
			return "ShopItem"
		end,
	})
	ShopItem.__index = ShopItem
	function ShopItem.new(...)
		local self = setmetatable({}, ShopItem)
		return self:constructor(...) or self
	end
	function ShopItem:constructor(Name, Description, Price)
		self.Name = Name
		self.Description = Description
		self.Price = Price
	end
	function ShopItem:AssignViewport(viewport)
		local ref = WaitFor(items, self.Name)
		local mesh = WaitFor(ref, "Mesh"):Clone()
		self.Viewport = viewport
		self.Viewport.Name = self.Name
		self.Viewport.Title.Text = self.Name
		mesh.Parent = viewport
		local cam = Instance.new("Camera")
		local _position = mesh.Position
		local _vector3 = Vector3.new(0, 0, -5)
		cam.CFrame = CFrame.new(_position + _vector3, mesh.Position)
		cam.Parent = viewport
		viewport.CurrentCamera = cam
	end
end
local ShopItems = { ShopItem.new("Iron Sword", "A sharp blade, perfect for combat.", 500) }
local UI
do
	UI = setmetatable({}, {
		__tostring = function()
			return "UI"
		end,
	})
	UI.__index = UI
	function UI.new(...)
		local self = setmetatable({}, UI)
		return self:constructor(...) or self
	end
	function UI:constructor()
	end
	function UI:Main(plr)
		return plr:WaitForChild("PlayerGui"):WaitForChild("Main", 10)
	end
end
return {
	Assets = Assets,
	CharStats = CharStats,
	GameStats = GameStats,
	ShopItem = ShopItem,
	ShopItems = ShopItems,
	UI = UI,
}
