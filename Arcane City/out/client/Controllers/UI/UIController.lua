-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local RunService = _services.RunService
local StarterGui = _services.StarterGui
local Stats = _services.Stats
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local Exception = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Internal", "Exception").Exception
local UI = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").UI
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local FormatInt = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "FormatInt").default
local main = UI:Main(Player)
local gameUI = main.Game
local debugUI = main.Debug
local gold = gameUI.Gold
local crystals = gameUI.Crystals
local xp = gameUI.XP.Bar
local level = gameUI.Level
local questGuide = gameUI.QuestInstructions
local UIController = Knit.CreateController({
	Name = "UIController",
	RunDebugUI = function(self)
		if RunService:IsStudio() then
			debugUI.Visible = true
			task.spawn(function()
				while debugUI.Visible do
					debugUI.DataSend.Text = "Data Send (kb/s): " .. tostring(math.floor(Stats.DataSendKbps)) .. " kb/s"
					debugUI.DataReceive.Text = "Data Receive (kb/s): " .. tostring(math.floor(Stats.DataReceiveKbps)) .. " kb/s"
					debugUI.Memory.Text = "Memory: " .. FormatInt(math.floor(Stats:GetTotalMemoryUsageMb())) .. "mb"
					debugUI.Heartbeat.Text = "Heartbeat: " .. tostring(math.floor(Stats.HeartbeatTimeMs)) .. "ms"
					RunService.Heartbeat:Wait()
				end
			end)
		end
	end,
	KnitStart = function(self)
		print("[src/client/Controllers/UI/UIController.ts:44]", "UIController active")
		StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.All, false)
		local gameService = Knit.GetService("GameService")
		local data = Knit.GetService("DataManager")
		local levels = Knit.GetService("LevelsService")
		local quests = Knit.GetService("QuestService")
		local location = Knit.GetService("LocationService")
		local questArrow = Knit.GetController("QuestArrowController")
		local mouseLock = Knit.GetController("MouseLockController")
		local playerStats = Knit.GetController("PlayerStatsController")
		local notification = Knit.GetController("NotificationController")
		local loadScreen = Knit.GetController("LoadScreenController")
		local function EnableLoadScreen(inf)
			if inf == nil then
				inf = false
			end
			loadScreen:Toggle(true)
			if not inf then
				task.spawn(function()
					task.wait(math.random(1, 5))
					loadScreen:Toggle(false)
				end)
			end
		end
		local xpBar = Tweenable.new(xp, .15, Enum.EasingStyle.Sine)
		mouseLock:Toggle(true)
		gameService:Initiate()
		location.PlaceTeleported:Connect(function()
			return EnableLoadScreen(true)
		end)
		location.Teleported:Connect(EnableLoadScreen)
		quests.GameCompleted:Connect(function()
			print("[src/client/Controllers/UI/UIController.ts:75]", "game completed")
			questArrow:StopPointing()
			questGuide.Text = ""
		end)
		quests.Completed:Connect(function(i)
			return notification:Send("Quest Completed: " .. quests:GetQuestByNumber(i).Name)
		end)
		quests.Assigned:Connect(function(goal, name, instructions)
			questArrow:StopPointing()
			questArrow:PointTo(goal)
			questGuide.Text = instructions
			notification:Send("New Quest: " .. name)
		end)
		data.DataUpdated:Connect(function(name, value)
			name = RunService:IsStudio() and string.sub(name, 6) or name
			repeat
				if name == "gold" then
					gold.Value.Text = FormatInt(value)
					break
				end
				if name == "crystals" then
					crystals.Value.Text = FormatInt(value)
					break
				end
				if name == "questNumber" then
					quests:Assign(value)
					break
				end
				if name == "gameStats" then
					local stats = value
					playerStats:Update(stats.CharacterStats)
					xpBar:Tween({
						Size = UDim2.new((stats.XP / levels:GetXPUntilNext()) * .93, 0, 1, 0),
					})
					level.Text = FormatInt(stats.Level)
					break
				end
				error(Exception.new("Unhandled database key '" .. name .. "'"))
			until true
		end)
		self:RunDebugUI()
	end,
})
return UIController
