import { LoadWheel } from "./Components/LoadWheel";
import Roact from "@rbxts/roact";

export const LoadScreen = (
    <screengui Key="LoadScreen" DisplayOrder={10} ZIndexBehavior={Enum.ZIndexBehavior.Sibling} Enabled={false}>
        <imagelabel
            Key="Background"
            BackgroundTransparency={1}
            Image="rbxassetid://8003546721"
            Position={new UDim2(0, 0, 0, -50)}
            Size={new UDim2(1, 0, 1, 50)}
            ZIndex={0}
        />
        <textlabel
            Key="Loading"
            BackgroundTransparency={1}
            Font={Enum.Font.RobotoCondensed}
            Position={new UDim2(0.125, 0, 0.8250000000000001, 0)}
            Size={new UDim2(0.25, 0, 0.1, 0)}
            Text="Loading..."
            TextColor3={Color3.fromRGB(255, 255, 255)}
            TextScaled={true}
            TextSize={14}
            TextStrokeTransparency={0.4}
            TextWrapped={true}
            TextXAlignment={Enum.TextXAlignment.Left}
            ZIndex={1}
        />
        <LoadWheel Pos={new UDim2(0.025, 0, 0.812, 0)} Size={new UDim2(0, 100, 0, 100)} Img="581563121" />
    </screengui>
);