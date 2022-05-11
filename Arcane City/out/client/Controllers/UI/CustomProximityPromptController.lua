-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local UI = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").UI
local GetDialoguePrompt = TS.import(script, script.Parent.Parent.Parent, "Roact", "DialoguePrompt").default
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local ProximityPromptService = TS.import(script, TS.getModule(script, "@rbxts", "services")).ProximityPromptService
local main = UI:Main(Player)
local function CreatePrompt(prompt)
	local function UpdateUIFromPrompt()
		local promptFrame = main.Interactions:WaitForChild("DialoguePrompt")
		local action = promptFrame:WaitForChild("Action")
		local object = promptFrame:WaitForChild("Object")
		action.Text = prompt.ActionText
		object.Text = prompt.ObjectText
		action.AutoLocalize = prompt.AutoLocalize
		object.AutoLocalize = prompt.AutoLocalize
		action.RootLocalizationTable = prompt.RootLocalizationTable
		object.RootLocalizationTable = prompt.RootLocalizationTable
	end
	local promptTree = Roact.mount(GetDialoguePrompt(prompt), main.Interactions)
	local changedConn = prompt.Changed:Connect(UpdateUIFromPrompt)
	UpdateUIFromPrompt()
	local function Teardown()
		changedConn:Disconnect()
		Roact.unmount(promptTree)
	end
	return Teardown
end
local CustomProximityPromptController = Knit.CreateController({
	Name = "CustomProximityPromptController",
	KnitStart = function(self)
		print("[src/client/Controllers/UI/CustomProximityPromptController.ts:47]", "CustomProximityPromptController active")
		ProximityPromptService.PromptShown:Connect(function(prompt)
			if prompt.Style == Enum.ProximityPromptStyle.Default then
				return nil
			end
			local Teardown = CreatePrompt(prompt)
			prompt.PromptHidden:Wait()
			Teardown()
		end)
	end,
})
return CustomProximityPromptController
