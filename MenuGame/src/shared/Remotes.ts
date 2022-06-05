import { Definitions } from "@rbxts/net";

const Remotes = Definitions.Create({
    DataBaseUpdate: Definitions.ServerToClientEvent<[name: string, newValue: unknown]>()
});

export { Remotes };