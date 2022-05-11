-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Component = _knit.Component
local Knit = _knit.KnitServer
local Exception = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Internal", "Exception").Exception
local modules = (script.Parent:FindFirstChild("Services")):GetDescendants()
for _, module in ipairs(modules) do
	if module:IsA("ModuleScript") then
		require(module)
	end
end
local _exp = Knit.Start()
local _arg0 = function()
	return Component.Auto(script.Parent:FindFirstChild("Components"))
end
_exp:andThen(_arg0):catch(function(e)
	error(Exception.new(e))
end)
