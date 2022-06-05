import { $dbg } from "rbxts-transform-debug";

export class Exception {
    public constructor(
        public readonly msg?: string, 
        public readonly lvl?: number
    ) {
        error(msg, lvl);
    }
}