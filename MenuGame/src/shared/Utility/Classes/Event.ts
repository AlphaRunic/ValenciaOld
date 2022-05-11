export class EventListener<F extends Callback> {
    public Callback?: F;

    public constructor(
        public readonly EventName: string
    ) {}

    public Stop(): void {
        this.Callback = undefined;
    }
}

export class Event<F extends Callback> {
    public readonly Listener: EventListener<F>;
    
    public constructor(
        public readonly Name: string
    ) {
        this.Listener = new EventListener<F>(Name);
    }

    public Fire<A extends Array<unknown>>(...args: A): void {
        if (this.Listener.Callback)
            this.Listener.Callback(...args);
    }

    public Listen(callback: F): EventListener<F> {
        this.Listener.Callback = callback;
        return this.Listener;
    }
}