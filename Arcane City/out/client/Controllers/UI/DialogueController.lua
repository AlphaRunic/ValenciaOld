-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable roblox-ts/lua-truthiness
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitClient
local Signal = _knit.Signal
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local UI = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs").UI
local Spacify = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Spacify").Spacify
local main = UI:GetMain(Player)
local dialogueFrame = main.Interactions.Dialogue
local charLock = Knit.GetService("CharacterLockService")
local mouseLock = Knit.GetController("MouseLockController")
local input = Knit.GetController("InputController")
local Dialogue
do
	Dialogue = setmetatable({}, {
		__tostring = function()
			return "Dialogue"
		end,
	})
	Dialogue.__index = Dialogue
	function Dialogue.new(...)
		local self = setmetatable({}, Dialogue)
		return self:constructor(...) or self
	end
	function Dialogue:constructor(Speaker, Text)
		self.Speaker = Speaker
		self.Text = Text
		self.Finished = Signal.new()
		self.CurrentText = 1
		self.NextBtnConn = dialogueFrame.Next.MouseButton1Click:Connect(function()
			return self:Next()
		end)
	end
	function Dialogue:Start()
		charLock:Toggle(true)
		mouseLock:Toggle(false)
		dialogueFrame.Visible = true
		self.Finished:Connect(function()
			return self:Teardown()
		end)
		input:BindUp("DialogueNext", Enum.KeyCode.Space, function()
			return self:Next()
		end)
		self:Update()
	end
	function Dialogue:Teardown()
		charLock:Toggle(false)
		mouseLock:Toggle(true)
		dialogueFrame.Visible = false
		dialogueFrame.Next.Text = "Next"
		input:Unbind("DialogueNext")
		self.NextBtnConn:Disconnect()
	end
	function Dialogue:GetDialogueText(offset)
		if offset == nil then
			offset = 0
		end
		return self.Text[self.CurrentText - 1 + offset + 1]
	end
	function Dialogue:Update()
		local currentText = self:GetDialogueText()
		if not (currentText ~= "" and currentText) then
			return self.Finished:Fire()
		end
		dialogueFrame.Content.Text = currentText
		dialogueFrame.Speaker.Text = self.Speaker
		local _value = self:GetDialogueText(1)
		if not (_value ~= "" and _value) then
			dialogueFrame.Next.Text = "Done"
		end
	end
	function Dialogue:Next()
		self.CurrentText += 1
		self:Update()
	end
end
local DialogueController = Knit.CreateController({
	Name = "DialogueController",
	Create = function(self, character)
		local textList = {}
		local dialogue = character:WaitForChild("Dialogue")
		local attrsRead = false
		do
			local i = 1
			local _shouldIncrement = false
			while true do
				if _shouldIncrement then
					i += 1
				else
					_shouldIncrement = true
				end
				if not not attrsRead then
					break
				end
				local text = dialogue:GetAttribute(tostring(i))
				-- ▼ Array.push ▼
				textList[#textList + 1] = text
				-- ▲ Array.push ▲
				local _value = dialogue:GetAttribute(tostring(i + 1))
				if not (_value ~= 0 and (_value == _value and (_value ~= "" and _value))) then
					attrsRead = true
				end
			end
		end
		return Dialogue.new(Spacify(character.Name), textList)
	end,
})
return DialogueController
