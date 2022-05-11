-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local HoverColorController = Knit.CreateController({
	Name = "HoverColorController",
	Enable = function(self, buttons, color)
		for _, b in ipairs(buttons) do
			local defaultColor = b.ImageColor3
			local btn = Tweenable.new(b, .75, Enum.EasingStyle.Sine)
			b.MouseEnter:Connect(function()
				return btn:Tween({
					ImageColor3 = color,
				})
			end)
			b.MouseLeave:Connect(function()
				return btn:Tween({
					ImageColor3 = defaultColor,
				})
			end)
		end
	end,
})
return HoverColorController
