-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local _structs = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs")
local Assets = _structs.Assets
local UI = _structs.UI
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local main = UI:Main(Player)
local interaction = main.Interactions
local notificationCenter = interaction.NotificationCenter
local NotificationController = Knit.CreateController({
	Name = "NotificationController",
	Send = function(self, message)
		local notifLabel = Assets.UI.NotificationLabel:Clone()
		notifLabel.Text = message
		notifLabel.Parent = notificationCenter
		local notif = Tweenable.new(notifLabel)
		notif:TweenCustom(TweenInfo.new(.75, Enum.EasingStyle.Sine, Enum.EasingDirection.In, 0, false, 5), {
			TextTransparency = 1,
			TextStrokeTransparency = 1,
		}).Completed:Connect(function()
			return notifLabel:Destroy()
		end)
	end,
})
return NotificationController
