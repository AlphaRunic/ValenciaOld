-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Spacify = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Spacify").Spacify
local DialoguePrompt
do
	DialoguePrompt = setmetatable({}, {
		__tostring = function()
			return "DialoguePrompt"
		end,
	})
	DialoguePrompt.__index = DialoguePrompt
	function DialoguePrompt.new(...)
		local self = setmetatable({}, DialoguePrompt)
		return self:constructor(...) or self
	end
	function DialoguePrompt:constructor(instance)
		local _arg0 = instance:IsA("Model")
		assert(_arg0)
		local quests = Knit.GetService("QuestService")
		local dialogue = Knit.GetController("DialogueController")
		local characterName = Spacify(instance.Name)
		print("[src/client/Components/DialoguePrompt.ts:14]", "DialoguePromptComponent modifying: " .. characterName)
		local prompt = Instance.new("ProximityPrompt")
		prompt.ObjectText = characterName
		prompt.ActionText = "Talk"
		prompt.KeyboardKeyCode = Enum.KeyCode.X
		prompt.GamepadKeyCode = Enum.KeyCode.ButtonX
		prompt.Style = Enum.ProximityPromptStyle.Custom
		prompt.ClickablePrompt = false
		prompt.RequiresLineOfSight = false
		prompt.Parent = instance.PrimaryPart
		local requiredQuestNumber = instance:GetAttribute("RequiredQuest")
		local requiredQuest = quests:GetQuestByNumber(requiredQuestNumber)
		local function SetupDialogue()
			local d = dialogue:Create(instance)
			d.Finished:Connect(function()
				return quests:CompleteCurrent()
			end)
			d:Start()
		end
		prompt.Triggered:Connect(function(plr)
			local currentQuest = quests:GetCurrentQuest()
			local _result = currentQuest
			if _result ~= nil then
				_result = _result.Name
			end
			local atCorrectQuest = _result == requiredQuest.Name
			prompt.Enabled = false
			if atCorrectQuest then
				SetupDialogue()
			end
		end)
	end
	function DialoguePrompt:Destroy()
	end
	DialoguePrompt.Tag = "DialoguePrompt"
end
return DialoguePrompt
