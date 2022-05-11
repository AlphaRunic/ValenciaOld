-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local UI = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").UI
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local main = UI:GetMain(Player)
local gameUI = main.Game
local statsList = gameUI.Stats.List
local function UpdateStat(stat, value)
	local statLabel = statsList:WaitForChild(stat)
	statLabel.Text = stat .. (" : " .. tostring(value))
end
local PlayerStatsController = Knit.CreateController({
	Name = "PlayerStatsController",
	UpdateUI = function(self, stats)
		UpdateStat("Damage", stats.Damage)
		UpdateStat("Resist", stats.Resist)
		local statLabel = statsList:WaitForChild("Health")
		statLabel.Text = "Health : " .. (tostring(stats.Health) .. (" / " .. tostring(stats.MaxHealth)))
	end,
	KnitStart = function(self)
		print("[src/client/Controllers/UI/PlayerStatsController.ts:34]", "PlayerStatsController active")
		local key = Enum.KeyCode
		local style = Enum.EasingStyle
		local inputState = Enum.UserInputState
		local input = Knit.GetController("InputController")
		local statsUI = Tweenable.new(gameUI.Stats, .4, style.Back)
		local openPos = gameUI.Stats:GetAttribute("OpenPos")
		local closedPos = gameUI.Stats:GetAttribute("ClosedPos")
		input:Bind("ToggleStats", function(name, state)
			if state == inputState.Begin then
				statsUI:TweenOut({
					Position = openPos,
				})
			elseif state == inputState.End then
				statsUI:TweenIn({
					Position = closedPos,
				})
			end
		end, false, key.Tab)
	end,
})
return PlayerStatsController
