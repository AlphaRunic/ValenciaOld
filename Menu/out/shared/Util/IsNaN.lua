-- Compiled with roblox-ts v1.2.7
local function IsNaN(value)
	if typeof(value) ~= "number" then
		return true
	end
	return value ~= value
end
return {
	default = IsNaN,
}
