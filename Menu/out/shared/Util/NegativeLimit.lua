-- Compiled with roblox-ts v1.2.7
local function NegativeLimit(n, limit)
	if n < -limit then
		return -limit
	elseif n > limit then
		return limit
	end
	return n
end
return {
	default = NegativeLimit,
}
