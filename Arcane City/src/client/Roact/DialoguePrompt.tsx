import Roact from "@rbxts/roact";

interface ProximityPromptUIProps {
    Action: string;
    Object: string;
}

function DialoguePromptUI(props: ProximityPromptUIProps): Roact.Element {
    return (
        <frame
            Key="DialoguePrompt"
            AnchorPoint={new Vector2(0.5, 0.5)}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            Position={new UDim2(0.5, 0, 0.725, 0)}
            Size={new UDim2(0.35, 0, 0.2, 0)}
        >
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(163, 163, 163))])}
                Rotation={90}
            />
            <uicorner CornerRadius={new UDim(1, 0)} />
            <textlabel
                Key="Press"
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.Roboto}
                Position={new UDim2(0.18, 0, 0.65, 0)}
                Size={new UDim2(0.2, 0, 0.25, 0)}
                Text="Press"
                TextColor3={Color3.fromRGB(0, 0, 0)}
                TextScaled={true}
                TextSize={14}
                TextStrokeTransparency={0.6}
                TextWrapped={true}
            />
            <imagelabel
                Key="Key"
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://8004718238"
                Position={new UDim2(0.4, 0, 0.65, 0)}
                Size={new UDim2(0.175, 0, 0.5, 0)}
            >
                <uiaspectratioconstraint />
            </imagelabel>
            <textlabel
                Key="Action"
                AnchorPoint={new Vector2(0, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.Roboto}
                Position={new UDim2(0.6, 0, 0.65, 0)}
                Size={new UDim2(0.35, 0, 0.25, 0)}
                Text={props.Action}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                TextScaled={true}
                TextSize={14}
                TextStrokeTransparency={0.6}
                TextWrapped={true}
                TextXAlignment={Enum.TextXAlignment.Left}
            />
            <textlabel
                Key="Object"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Font={Enum.Font.GothamBlack}
                Position={new UDim2(0.5, 0, 0.2, 0)}
                Size={new UDim2(0.75, 0, 0.25, 0)}
                Text={props.Object}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                TextScaled={true}
                TextSize={14}
                TextWrapped={true}
            />
            <frame
                Key="Shadow"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundColor3={Color3.fromRGB(8, 8, 8)}
                BackgroundTransparency={0.4}
                Position={new UDim2(0.5, 0, 0.55, 0)}
                Size={new UDim2(1.01, 0, 1.1, 0)}
                ZIndex={0}
            >
                <uicorner CornerRadius={new UDim(1, 0)} />
            </frame>
            <frame
                Key="Line"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundColor3={Color3.fromRGB(126, 126, 126)}
                BorderSizePixel={0}
                Position={new UDim2(0.5, 0, 0.35, 0)}
                Size={new UDim2(0.75, 0, 0, 2)}
            />
        </frame>
    );
}

export default function GetDialoguePrompt(prompt: ProximityPrompt): Roact.Element {
    return <DialoguePromptUI Action={prompt.ActionText} Object={prompt.ObjectText} />;
}