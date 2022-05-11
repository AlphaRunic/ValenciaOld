-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Knit = TS.import(script, TS.getModule(script, "@rbxts", "knit").Knit).KnitClient
local Action = TS.import(script, TS.getModule(script, "@rbxts", "services")).ContextActionService
local InputController = Knit.CreateController({
	Name = "InputController",
	Bind = function(self, name, fn, createTouch, ...)
		if createTouch == nil then
			createTouch = false
		end
		local inputTypes = { ... }
		Action:BindAction(name, fn, createTouch, unpack(inputTypes))
	end,
	ToggleBind = function(self, name, key, fn, createTouch)
		if createTouch == nil then
			createTouch = false
		end
		self:Bind(name, function(action, state, io)
			if state == Enum.UserInputState.Begin then
				fn(true)
			elseif state == Enum.UserInputState.End then
				fn(false)
			end
		end, createTouch, key)
	end,
	BindDown = function(self, name, key, fn, createTouch)
		if createTouch == nil then
			createTouch = false
		end
		self:Bind(name, function(action, state, io)
			if state == Enum.UserInputState.Begin then
				fn(action, state, io)
			end
		end, createTouch, key)
	end,
	BindUp = function(self, name, key, fn, createTouch)
		if createTouch == nil then
			createTouch = false
		end
		self:Bind(name, function(action, state, io)
			if state == Enum.UserInputState.End then
				fn(action, state, io)
			end
		end, createTouch, key)
	end,
	Unbind = function(self, name)
		Action:UnbindAction(name)
	end,
})
return InputController
