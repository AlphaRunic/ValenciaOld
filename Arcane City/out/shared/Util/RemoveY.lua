-- Compiled with roblox-ts v1.2.7
local function RemoveY(vec)
	return Vector3.new(vec.X, 0, vec.Z)
end
return {
	default = RemoveY,
}
