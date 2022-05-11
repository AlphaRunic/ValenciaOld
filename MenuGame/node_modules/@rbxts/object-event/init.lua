--[[
    File: init.lua
    Author: davness
    Year: 2019
    License: MIT

    This file acts as a runtime for the ObjectEvent described in the index file.
--]]

-- Declare existance of our classes
local RBXScriptSignalLike, ObjectEvent, ObjectEventConnection

RBXScriptSignalLike = setmetatable({}, {
	__tostring = function()
		return "RBXScriptSignalLike"
	end
})

RBXScriptSignalLike.__index = RBXScriptSignalLike

function RBXScriptSignalLike.new()
	local self = setmetatable({}, RBXScriptSignalLike)
	self.SubscribedConnections = {}
	self.YieldQueue = {}

	return self
end

function RBXScriptSignalLike:Connect(f)
	return ObjectEventConnection.new(f, self)
end

function RBXScriptSignalLike:Wait()
	table.insert(self.YieldQueue, coroutine.running())
	return coroutine.yield()
end

ObjectEvent = setmetatable({}, {
	__tostring = function()
		return "ObjectEvent"
	end
})

ObjectEvent.__index = ObjectEvent

function ObjectEvent.new()
	local self = setmetatable({}, ObjectEvent)
	self.Event = RBXScriptSignalLike.new()
	self.SubscribedConnections = self.Event.SubscribedConnections

	return self
end

function ObjectEvent:Connect(f)
	return self.Event.Connect(self.Event, f)
end

function ObjectEvent:Wait()
	return self.Event.Wait(self.Event)
end

function ObjectEvent:Fire(...)
	local args = {...}

	-- Activate all listeners
	for _, c in pairs(self.Event.SubscribedConnections) do
		task.spawn(function()
			c.Listener(unpack(args))
		end)
	end

	-- Resume all yielding threads on :Wait()
	for _, t in pairs(self.Event.YieldQueue) do
		task.spawn(t, unpack(args))
	end

	-- Reset the yielding queue.
	self.YieldQueue = {}
end

ObjectEventConnection = setmetatable({}, {
	__tostring = function()
		return "EventConnection"
	end
})

ObjectEventConnection.__index = ObjectEventConnection

function ObjectEventConnection.new(toConnect, event)
	local self = setmetatable({}, ObjectEventConnection)
	self.Listener = toConnect
	self.Event = event
	self.Enabled = false
	-- Forcing reconnect should do the trick
	self:Reconnect()

	return self
end

function ObjectEventConnection:IsConnected()
	return self.Enabled;
end

function ObjectEventConnection:Disconnect()
	local subscribers = self.Event.SubscribedConnections
	local index = table.find(subscribers, self)

	if not index then
		warn("Attempted to disconnect an event that wasn't connected at all. Exiting.", 0)
		return nil
	end

	table.remove(subscribers, index)
	self.Enabled = false
end

function ObjectEventConnection:Reconnect()
	local subscribers = self.Event.SubscribedConnections
	local index = table.find(subscribers, self)

	if index then
		warn("Attempted to reconnect an event that is already connected. Exiting.", 0)
		return nil
	end

	table.insert(subscribers, self);
	self.Enabled = true;
end

return ObjectEvent
