-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedFirst = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedFirst
local Assets = ReplicatedFirst.Assets
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
	function UI:GetMain(plr)
		return plr:WaitForChild("PlayerGui"):WaitForChild("Menu", 10)
	end
end
return {
	Assets = Assets,
	UI = UI,
}
