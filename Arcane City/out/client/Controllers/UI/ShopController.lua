-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- eslint-disable @typescript-eslint/no-explicit-any
local _knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit)
local Knit = _knit.KnitClient
local Signal = _knit.Signal
local Player = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit.KnitClient).Player
local _structs = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "structs")
local Assets = _structs.Assets
local ShopItems = _structs.ShopItems
local UI = _structs.UI
local Tweenable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "Tweenable").default
local FormatInt = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "Util", "FormatInt").default
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local main = UI:GetMain(Player)
local shop = main.Interactions.Shop
local display = shop.ItemDisplay
local purchaseItem = display.Shadow.Purchase
local itemIcon = display.Shadow.ItemIcon
local description = display.Shadow.Description
local price = itemIcon.Price
local style = Enum.EasingStyle.Sine
local animTime = .3
local displayFrame = Tweenable.new(display, animTime, style)
local displayShadow = Tweenable.new(display.Shadow, animTime, style)
local window = Tweenable.new(shop.Window, animTime, style)
local displayOpenPos = display:GetAttribute("OpenPos")
local shadowOpenPos = display.Shadow:GetAttribute("OpenPos")
local windowOpenPos = shop.Window:GetAttribute("OpenPos")
local displayClosedPos = display:GetAttribute("ClosedPos")
local shadowClosedPos = display.Shadow:GetAttribute("ClosedPos")
local windowClosedPos = shop.Window:GetAttribute("ClosedPos")
local ShopController = Knit.CreateController({
	Name = "ShopController",
	Toggled = Signal.new(),
	DisplayStateChanged = Signal.new(),
	Toggle = function(self, active)
		self.Toggled:Fire(active)
		shop.Visible = active
		main.Game.Visible = not active
		displayFrame:TweenOut({
			Position = displayClosedPos,
		})
		displayShadow:TweenOut({
			Position = shadowClosedPos,
		})
		window:TweenOut({
			Position = windowClosedPos,
		})
	end,
	KnitStart = function(self)
		print("[src/client/Controllers/UI/ShopController.ts:52]", "ShopController active")
		local data = Knit.GetService("DataManager")
		local charLock = Knit.GetService("CharacterLockService")
		local quests = Knit.GetService("QuestService")
		local mouseLock = Knit.GetController("MouseLockController")
		local blur = Knit.GetController("BlurController")
		shop.Window.Close.MouseButton1Click:Connect(function()
			return self:Toggle(false)
		end)
		self.Toggled:Connect(function(active)
			charLock:Toggle(active)
			blur:Toggle(active)
			mouseLock:Toggle(not active)
		end)
		local displayOpen = false
		local purchaseConn
		local spinConn
		self.DisplayStateChanged:Connect(function(active, selectedItem)
			displayOpen = active
			local _result = purchaseConn
			if _result ~= nil then
				_result:Disconnect()
			end
			local stats = data:Get("gameStats")
			local _ownedItems = stats.OwnedItems
			local _arg0 = function(i)
				return i.Name
			end
			-- ▼ ReadonlyArray.map ▼
			local _newValue = table.create(#_ownedItems)
			for _k, _v in ipairs(_ownedItems) do
				_newValue[_k] = _arg0(_v, _k - 1, _ownedItems)
			end
			-- ▲ ReadonlyArray.map ▲
			local _name = selectedItem.Name
			if table.find(_newValue, _name) ~= nil then
				purchaseItem.Text = "Purchased"
			else
				purchaseItem.Text = "Purchase"
			end
			local mesh = selectedItem.Viewport:FindFirstChildOfClass("MeshPart"):Clone()
			if active then
				mesh.Parent = itemIcon
				spinConn = RunService.Heartbeat:Connect(function()
					local _cFrame = mesh.CFrame
					local _arg0_1 = CFrame.Angles(math.rad(1), 0, math.rad(1))
					mesh.CFrame = _cFrame * _arg0_1
					return mesh.CFrame
				end)
				displayFrame:TweenIn({
					Position = displayOpenPos,
				})
				displayShadow:TweenIn({
					Position = shadowOpenPos,
				})
				window:TweenIn({
					Position = windowOpenPos,
				})
			else
				spinConn:Disconnect()
				itemIcon:FindFirstChildOfClass("MeshPart"):Destroy()
				displayFrame:TweenOut({
					Position = displayClosedPos,
				})
				displayShadow:TweenOut({
					Position = shadowClosedPos,
				})
				window:TweenOut({
					Position = windowClosedPos,
				})
			end
			itemIcon.CurrentCamera = selectedItem.Viewport.CurrentCamera
			description.Text = selectedItem.Description
			price.Text = FormatInt(selectedItem.Price)
			purchaseConn = purchaseItem.MouseButton1Click:Connect(function()
				local _ownedItems_1 = stats.OwnedItems
				local _arg0_1 = function(i)
					return i.Name
				end
				-- ▼ ReadonlyArray.map ▼
				local _newValue_1 = table.create(#_ownedItems_1)
				for _k, _v in ipairs(_ownedItems_1) do
					_newValue_1[_k] = _arg0_1(_v, _k - 1, _ownedItems_1)
				end
				-- ▲ ReadonlyArray.map ▲
				local _name_1 = selectedItem.Name
				if table.find(_newValue_1, _name_1) ~= nil then
					return nil
				end
				local gold = data:Get("gold")
				if gold >= selectedItem.Price then
					local stats = data:Get("gameStats")
					local _ownedItems_2 = stats.OwnedItems
					-- ▼ Array.push ▼
					_ownedItems_2[#_ownedItems_2 + 1] = selectedItem
					-- ▲ Array.push ▲
					data:Set("gameStats", stats)
					purchaseItem.Text = "Purchased"
					data:Set("gold", gold - selectedItem.Price)
					local currentQuest = quests:GetCurrentQuest()
					local _result_1 = currentQuest
					if _result_1 ~= nil then
						_result_1 = _result_1.Name
					end
					if _result_1 == "Initiation" then
						local _equippedItems = stats.EquippedItems
						-- ▼ Array.push ▼
						_equippedItems[#_equippedItems + 1] = selectedItem
						-- ▲ Array.push ▲
						data:Set("gameStats", stats)
						quests:CompleteCurrent()
					end
				end
			end)
		end)
		local lastItem
		local inputType = Enum.UserInputType
		for _, item in ipairs(ShopItems) do
			local viewport = Assets.UI.ShopItem:Clone()
			viewport.Parent = shop.Window.List
			item:AssignViewport(viewport)
			local itemTitle = Tweenable.new(viewport.Title, .25, style)
			local openPos = viewport.Title:GetAttribute("OpenPos")
			local closedPos = viewport.Title:GetAttribute("ClosedPos")
			viewport.MouseEnter:Connect(function()
				return itemTitle:Tween({
					Position = openPos,
				})
			end)
			viewport.MouseLeave:Connect(function()
				return itemTitle:Tween({
					Position = closedPos,
				})
			end)
			viewport.InputBegan:Connect(function(io)
				if io.UserInputType == inputType.MouseButton1 then
					if lastItem == viewport and displayOpen then
						self.DisplayStateChanged:Fire(false, item)
					elseif lastItem == nil or not displayOpen then
						self.DisplayStateChanged:Fire(true, item)
					end
					lastItem = viewport
				end
			end)
		end
	end,
})
return ShopController
