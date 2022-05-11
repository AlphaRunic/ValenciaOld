import Roact from "@rbxts/roact";
export type Element<T extends Instance> = JSX.IntrinsicElement<T> & Roact.Element;