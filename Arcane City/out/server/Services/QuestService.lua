-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitServer
local RemoteSignal = _knit.RemoteSignal
local Signal = _knit.Signal
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local _Quest = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Quest")
local Quest = _Quest.Quest
local XPGain = _Quest.XPGain
local Worlds = TS.import(script, game:GetService("ServerScriptService"), "TS", "Classes", "Worlds").default
local data = Knit.GetService("DataManager")
local QuestService = Knit.CreateService({
	Name = "QuestService",
	Quests = { Quest.Quest.new("", "Do", "Something", "Somewhere", Vector3.new(), {}) },
	Assigned = Signal.new(),
	Completed = Signal.new(),
	GameCompleted = Signal.new(),
	Client = {
		Assigned = RemoteSignal.new(),
		Completed = RemoteSignal.new(),
		GameCompleted = RemoteSignal.new(),
		Assign = function(self, plr, questIdx)
			self.Server:Assign(plr, questIdx)
		end,
		Complete = function(self, plr, questIdx)
			self.Server:Complete(plr, questIdx)
		end,
		CompleteCurrent = function(self, plr)
			self.Server:CompleteCurrent(plr)
		end,
		GetCurrentQuest = function(self, plr)
			return self.Server:GetCurrentQuest(plr)
		end,
		GetCurrentQuestNumber = function(self, plr)
			return self.Server:GetCurrentQuestNumber(plr)
		end,
		GetQuestByNumber = function(self, plr, questNumber)
			return self.Server:GetQuestByNumber(questNumber)
		end,
		GetQuestByName = function(self, plr, questName)
			return self.Server:GetQuestByName(questName)
		end,
	},
	KnitStart = function(self)
		print("[src/server/Services/QuestService.ts:57]", "QuestService active")
		local goals = Workspace.QuestGoals
		local spawns = Workspace.EnemySpawns
		local ac = Worlds:Get("Arcane City")
		self.Quests = { Quest.Quest.new("Initiation", Quest.Predicate.Interact, "Weapon shop", ac.CommonArea.Name, goals.Shop.Position, { XPGain.new(200) }), Quest.Quest.new("What's This?", Quest.Predicate.GoTo, "Strange floating crystal", ac.CommonArea.Name, goals.Crystal.Position, { XPGain.new(400) }), Quest.Quest.new("A Waking Force", Quest.Predicate.TalkTo, "Old Man", ac.CommonArea.Name, goals.NPCs.OldMan.PrimaryPart.Position, { XPGain.new(300) }), Quest.Quest.new("Learning Experience", Quest.Predicate.TalkTo, "Librarian", "Minotaur Alley", goals.NPCs.Librarian.PrimaryPart.Position, { XPGain.new(400) }), Quest.Quest.new("Necromantic Wands", Quest.Predicate.Defeat, "Necromancer", "Minotaur Alley", spawns["Minotaur Alley"].Spawner.Position, { XPGain.new(600) }) }
	end,
	GetQuestByName = function(self, questName)
		for _, q in ipairs(self.Quests) do
			if q.Name == questName then
				return q
			end
		end
	end,
	GetQuestByNumber = function(self, questNumber)
		return self.Quests[questNumber - 1 + 1]
	end,
	GetCurrentQuestNumber = function(self, plr)
		return data:Get(plr, "questNumber")
	end,
	GetCurrentQuest = function(self, plr)
		local quest = self.Quests[self:GetCurrentQuestNumber(plr) - 1 + 1]
		if not quest then
			return nil
		end
		return quest
	end,
	CompleteCurrent = function(self, plr)
		local current = self:GetCurrentQuest(plr)
		local idx = (table.find(self.Quests, current) or 0) - 1 + 1
		if current.Completed == true then
			warn("[src/server/Services/QuestService.ts:130]", "Failed to complete quest at index " .. (tostring(idx) .. " (quest already completed)."))
			return nil
		end
		self:Complete(plr, idx)
	end,
	Complete = function(self, plr, questIdx)
		local quest = self:GetQuestByNumber(questIdx)
		if not quest then
			warn("[src/server/Services/QuestService.ts:139]", "Failed to complete quest at index " .. (tostring(questIdx) .. " (quest not found)."))
			return nil
		end
		self.Client.Completed:Fire(plr, questIdx)
		quest:Complete(plr)
	end,
	Assign = function(self, plr, questIdx)
		local quest = self:GetQuestByNumber(questIdx)
		if not quest then
			self.Client.GameCompleted:Fire(plr)
			return nil
		end
		self.Client.Assigned:Fire(plr, quest.Goal, quest.Name, quest:MakeInstructions())
	end,
})
return QuestService
