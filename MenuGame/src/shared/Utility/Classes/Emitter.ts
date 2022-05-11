import { Event } from './Event';

export default class Emitter<Callbacks extends {[key: string]: Callback}> {
    public constructor(
        public readonly Events: Event<Callback>[] = []
    ) {}

    public Send<A extends Array<unknown>>(name: keyof Callbacks, ...args: A): Emitter<Callbacks> {
        const event = this.Events.find(e => e.Name === name);
        if (event)
            event.Fire<A>(...args);

        return this;
    }

    public Listen<F extends Callback>(name: string, callback: F): void {
        const event = new Event<F>(name);
        event.Listen(callback);
        this.Events.push(event);
    }
}