import Roact from "@rbxts/roact";

interface ProximityPromptUIProps {
    Action: string;
    Object: string;
}

function DialoguePromptUI(props: ProximityPromptUIProps): Roact.Element {
    return (
        <imagelabel
            Key="DialoguePrompt"
            AnchorPoint={new Vector2(0.5, 0.5)}
            BackgroundTransparency={1}
            Image="rbxassetid://9673895844"
            Position={new UDim2(0.5, 0, 0.8250000000000001, 0)}
            Size={new UDim2(0.45, 0, 0.45, 0)}
        >
            <textlabel
                Key="Press"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.LuckiestGuy}
                Position={new UDim2(0.209, 0, 0.5, 5)}
                Size={new UDim2(0.163, 0, 0.1, 0)}
                Text="Press"
                TextColor3={Color3.fromRGB(255, 255, 0)}
                TextScaled={true}
                TextSize={20}
                TextStrokeTransparency={0.1}
                TextWrapped={true}
                TextXAlignment={Enum.TextXAlignment.Left}
            />
            <imagelabel
                Key="X"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://9673913181"
                Position={new UDim2(0.336, 0, 0.51, 0)}
                Size={new UDim2(0.15, 0, 0.15, 0)}
            >
                <uiaspectratioconstraint />
            </imagelabel>
            <textlabel
                Key="Action"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.LuckiestGuy}
                Position={new UDim2(0.509, 0, 0.5, 5)}
                Size={new UDim2(0.26, 0, 0.1, 0)}
                Text={props.Action}
                TextColor3={Color3.fromRGB(255, 255, 0)}
                TextScaled={true}
                TextSize={20}
                TextStrokeTransparency={0.1}
                TextWrapped={true}
                TextXAlignment={Enum.TextXAlignment.Left}
            />
            <textlabel
                Key="Object"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.LuckiestGuy}
                Position={new UDim2(0.76, 0, 0.5, 5)}
                Size={new UDim2(0.243, 0, 0.1, 0)}
                Text={props.Object}
                TextColor3={Color3.fromRGB(255, 255, 0)}
                TextScaled={true}
                TextSize={20}
                TextStrokeTransparency={0.1}
                TextWrapped={true}
            />
        </imagelabel>
    );
}

export default function GetDialoguePrompt(prompt: ProximityPrompt): Roact.Element {
    return <DialoguePromptUI Action={prompt.ActionText} Object={prompt.ObjectText} />;
}