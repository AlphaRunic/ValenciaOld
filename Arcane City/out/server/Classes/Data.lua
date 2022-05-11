-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local data = { "gold", "crystals", "questNumber", "gameStats" }
local _result
if RunService:IsStudio() then
	local _arg0 = function(k)
		return "TEST_" .. k
	end
	-- ▼ ReadonlyArray.map ▼
	local _newValue = table.create(#data)
	for _k, _v in ipairs(data) do
		_newValue[_k] = _arg0(_v, _k - 1, data)
	end
	-- ▲ ReadonlyArray.map ▲
	_result = _newValue
else
	_result = data
end
local Data = _result
return {
	Data = Data,
}
