import { KnitClient as Knit } from "@rbxts/knit";
import { ContextActionService as Action } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";

declare global {
    interface KnitControllers {
        InputController: typeof InputController;
    }
}

type ActionFn = (actionName: string, state: Enum.UserInputState, inputObject: InputObject) => void;
type InputType = 
    | Enum.KeyCode 
    | Enum.PlayerActions 
    | Enum.UserInputType;

const InputController = Knit.CreateController({
    Name: "InputController",

    Bind(name: string, fn: ActionFn, createTouch = false, ...inputTypes: InputType[]) {
        Action.BindAction(name, fn, createTouch, ...inputTypes);
    },

    ToggleBind(name: string, key: Enum.KeyCode | Enum.UserInputType, fn: (active: boolean) => void, createTouch = false) {
        this.Bind(name, (action, state, io) => {
            if (state === Enum.UserInputState.Begin)
                fn(true);
            else if (state === Enum.UserInputState.End)
                fn(false);
        }, createTouch, key);
    },

    BindDown(name: string, key: Enum.KeyCode | Enum.UserInputType, fn: ActionFn, createTouch = false) {
        this.Bind(name, (action, state, io) => {
            if (state === Enum.UserInputState.Begin)
                fn(action, state, io);
        }, createTouch, key);
    },

    BindUp(name: string, key: Enum.KeyCode | Enum.UserInputType, fn: ActionFn, createTouch = false) {
        this.Bind(name, (action, state, io) => {
            if (state === Enum.UserInputState.End)
                fn(action, state, io);
        }, createTouch, key);
    },
    
    Unbind(name: string) {
        Action.UnbindAction(name);
    }
});

export = InputController;