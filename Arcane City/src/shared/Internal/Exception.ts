import { $dbg, $warn } from "rbxts-transform-debug";

export class Exception {
    public constructor(
        public readonly msg?: string, 
        public readonly lvl = 2
    ) {
        throw error($warn(msg), lvl);
    }
}