import { Exception } from "shared/Internal/Exception";

export default class StrictMap<K, V> {
    private readonly cache: Map<K, V>;

    public constructor(base?: Map<K, V>) {
        this.cache = base?? new Map<K, V>();
    }

    public Size(): number {
        return this.cache.size();
    }

    public Set(key: K, value: V): StrictMap<K, V> {
        this.cache.set(key, value);
        return this;
    }

    public Get(key: K): V {
        const value: V | undefined = this.cache.get(key);
        if (!value)
            throw new Exception(`Key "${key}" has no value associated with it.`);
        else
            return value;
    }
}