-- Compiled with roblox-ts v1.2.7
local function RandomElement(arr)
	return arr[math.random(#arr) - 1 + 1]
end
return {
	default = RandomElement,
}
