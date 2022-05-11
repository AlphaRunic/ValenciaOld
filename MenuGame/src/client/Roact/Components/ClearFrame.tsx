import { Element } from "../Element";
import Roact from "@rbxts/roact";

export function ClearFrame(props: { Name: string; Ref?: Roact.Ref<Frame> }): Element<Frame> {
    return <frame
        Key={props.Name}
        Ref={props.Ref}
        BackgroundTransparency={1}
        Position={new UDim2(0, 0, 0, -50)}
        Size={new UDim2(1, 0, 1, 50)}
    >{props[Roact.Children]}</frame>;
}
