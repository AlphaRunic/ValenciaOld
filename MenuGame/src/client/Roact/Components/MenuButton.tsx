import Knit from "@rbxts/knit/Knit/KnitClient";
import { UI } from "shared/Utility/Classes/UI";
import { Element } from "../Element";
import AnimatedButton from "shared/Utility/Classes/AnimatedButton";
import Roact from "@rbxts/roact";

const spd = {
    menuButtons: .2
};

interface Props { 
    SwitchTo?: string;
    Name: string; 
    Img: string;
    Pos: UDim2; 
    Size: UDim2; 
}

interface State {
    Pop: number;
    ImgColor: Color3;
    Defaults: {
        Position: UDim2;
        Size: UDim2;
    }
}

export class MenuButton extends Roact.Component<Props, State> {
    private ref: Roact.Ref<ImageButton> = Roact.createRef();
    private readonly gui = UI.Folder();
    private readonly ui = Knit.GetController("UIController");

    public constructor(props: Props) {
        super(props);
        const brightness = 175;
        this.setState({
            Pop: 7,
            Defaults: { Position: props.Pos, Size: props.Size },
            ImgColor: Color3.fromRGB(brightness, brightness, brightness)
        });
    }

    protected didMount(): void {
        const b = this.ref.getValue()!;
        const btn = new AnimatedButton(b);
        btn.ClickPop(this.state.Pop, spd.menuButtons)
            .HoverColor(Color3.fromRGB(255, 255, 255), this.state.ImgColor, spd.menuButtons)!
            .HoverPop(this.state.Pop, spd.menuButtons);
    }

    public render(): Element<ImageButton> {
        return (
            <imagebutton
                Key={this.props.Name}
                Ref={this.ref}
                BackgroundTransparency={1}
                Image={"rbxassetid://" + this.props.Img}
                ImageColor3={this.state.ImgColor}
                Position={this.props.Pos}
                Size={this.props.Size}
                Event={{
                    MouseButton1Click: b => this.ui.HandleButton(b.Name, this.props.SwitchTo)
                }}
            >{this.props[Roact.Children]}
            </imagebutton>
        );
    }
}