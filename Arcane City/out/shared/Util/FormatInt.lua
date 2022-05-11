-- Compiled with roblox-ts v1.2.7
local function FormatInt(x)
	local tuple = { string.find(tostring(x), "([-]?)(%d+)([.]?%d*)") }
	local minus = tuple[3]
	local int = tuple[4]
	local fraction = tuple[5]
	int = (string.gsub(string.reverse(int), "(%d%d%d)", "%1"))
	return minus .. (string.gsub(string.reverse(int), "^,", "")) .. fraction
end
return {
	default = FormatInt,
}
