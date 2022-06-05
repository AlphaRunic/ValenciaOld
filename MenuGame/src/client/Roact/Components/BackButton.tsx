import { MenuButton } from "./MenuButton";
import { Element } from "../Element";
import Roact from "@rbxts/roact";

interface Props {
    ToFrame: keyof PlayerGui["Menu"];
}

export class BackButton extends Roact.Component<Props> {
    public render(): Element<ImageButton> {
        return (
            <MenuButton
                Name="Back"
                Img="9572660931"
                Pos={new UDim2(0.764, 0, 0.8270000000000001, 0)}
                Size={new UDim2(0.155, 0, 0.1, 0)}
                SwitchTo={this.props.ToFrame} />
        );
    }
}
