import { ClearFrame } from "./Components/ClearFrame";
import { MenuButton } from "./Components/MenuButton";
import { BackButton } from "./Components/BackButton";
import Roact from "@rbxts/roact";

const mainRef = Roact.createRef<Frame>();
export const Menu = (
    <screengui Key="Menu" ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
        <ClearFrame Name="Main" Ref={mainRef}>
            <MenuButton
                Name="Play"
                Img="9572659972"
                Pos={new UDim2(0.764, 0, 0.607, 0)}
                Size={new UDim2(0.155, 0, 0.1, 0)}
            />
            <MenuButton
                Name="Options"
                Img="9572660307"
                Pos={new UDim2(0.748, 0, 0.707, 0)}
                Size={new UDim2(0.187, 0, 0.12, 0)}
            />
            <MenuButton
                Name="Exit"
                Img="9572660669"
                Pos={new UDim2(0.764, 0, 0.8270000000000001, 0)}
                Size={new UDim2(0.155, 0, 0.1, 0)}
            />
            <imagelabel
                Key="Title"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://8046178075"
                Position={new UDim2(0.75, 0, 0.272, 0)}
                Rotation={1}
                Size={new UDim2(0.337, 0, 0.544, 0)}
            />
            <imagelabel
                Key="Dragon"
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Image="rbxassetid://8046258038"
                ImageColor3={Color3.fromRGB(227, 227, 227)}
                Position={new UDim2(0.234, 0, 0.354, 0)}
                Rotation={-3}
                Size={new UDim2(0.437, 0, 0.707, 0)}
            />
        </ClearFrame>
        <ClearFrame Name="Options">
            <BackButton ToFrame="Main" />
        </ClearFrame>
    </screengui>
)