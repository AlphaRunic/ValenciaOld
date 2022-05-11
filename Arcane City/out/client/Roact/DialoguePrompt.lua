-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local function DialoguePromptUI(props)
	return Roact.createFragment({
		DialoguePrompt = Roact.createElement("Frame", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundColor3 = Color3.fromRGB(255, 255, 255),
			Position = UDim2.new(0.5, 0, 0.725, 0),
			Size = UDim2.new(0.35, 0, 0.2, 0),
		}, {
			Roact.createElement("UIGradient", {
				Color = ColorSequence.new({ ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)), ColorSequenceKeypoint.new(1, Color3.fromRGB(163, 163, 163)) }),
				Rotation = 90,
			}),
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(1, 0),
			}),
			Press = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Font = Enum.Font.Roboto,
				Position = UDim2.new(0.18, 0, 0.65, 0),
				Size = UDim2.new(0.2, 0, 0.25, 0),
				Text = "Press",
				TextColor3 = Color3.fromRGB(0, 0, 0),
				TextScaled = true,
				TextSize = 14,
				TextStrokeTransparency = 0.6,
				TextWrapped = true,
			}),
			Key = Roact.createElement("ImageLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Image = "rbxassetid://8004718238",
				Position = UDim2.new(0.4, 0, 0.65, 0),
				Size = UDim2.new(0.175, 0, 0.5, 0),
			}, {
				Roact.createElement("UIAspectRatioConstraint"),
			}),
			Action = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Font = Enum.Font.Roboto,
				Position = UDim2.new(0.6, 0, 0.65, 0),
				Size = UDim2.new(0.35, 0, 0.25, 0),
				Text = props.Action,
				TextColor3 = Color3.fromRGB(0, 0, 0),
				TextScaled = true,
				TextSize = 14,
				TextStrokeTransparency = 0.6,
				TextWrapped = true,
				TextXAlignment = Enum.TextXAlignment.Left,
			}),
			Object = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBlack,
				Position = UDim2.new(0.5, 0, 0.2, 0),
				Size = UDim2.new(0.75, 0, 0.25, 0),
				Text = props.Object,
				TextColor3 = Color3.fromRGB(0, 0, 0),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}),
			Shadow = Roact.createElement("Frame", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundColor3 = Color3.fromRGB(8, 8, 8),
				BackgroundTransparency = 0.4,
				Position = UDim2.new(0.5, 0, 0.55, 0),
				Size = UDim2.new(1.01, 0, 1.1, 0),
				ZIndex = 0,
			}, {
				Roact.createElement("UICorner", {
					CornerRadius = UDim.new(1, 0),
				}),
			}),
			Line = Roact.createElement("Frame", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundColor3 = Color3.fromRGB(126, 126, 126),
				BorderSizePixel = 0,
				Position = UDim2.new(0.5, 0, 0.35, 0),
				Size = UDim2.new(0.75, 0, 0, 2),
			}),
		}),
	})
end
local function GetDialoguePrompt(prompt)
	return Roact.createElement(DialoguePromptUI, {
		Action = prompt.ActionText,
		Object = prompt.ObjectText,
	})
end
return {
	default = GetDialoguePrompt,
}
