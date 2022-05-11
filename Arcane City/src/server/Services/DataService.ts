import { KnitServer as Knit, RemoteSignal, Signal } from "@rbxts/knit";
import { RunService } from "@rbxts/services";
import { Data } from "server/Classes/Data";
import { $print } from "rbxts-transform-debug";
import DataStore2 from "@rbxts/datastore2";

declare global {
    interface KnitServices {
        DataManager: typeof DataManager;
    }
}

const DataManager = Knit.CreateService({
    Name: "DataManager",
    DataUpdated: new Signal<(plr: Player, name: string, value: unknown) => void>(),

    Client: {
        DataUpdated: new RemoteSignal<(name: string, value: unknown) => void>(),
        Get<T = unknown>(plr: Player, name: string, defaultValue?: T): T {
            return this.Server.Get(plr, name, defaultValue);
        },

        Set<T = unknown>(plr: Player, name: string, value: T): void {
            this.Server.Set(plr, name, value);
        }
    },

    KnitInit() {
        $print("DataService active");
        DataStore2.Combine("DATA", ...Data);
    },

    GetRawStore<V = unknown>(plr: Player, name: string): DataStore2<V> {
        if (RunService.IsStudio())
            return DataStore2<V>("TEST_" + name, plr);
        else
            return DataStore2<V>(name, plr);
    },

    Get<V = unknown>(plr: Player, name: string, defaultValue?: V): V {
        const store = this.GetRawStore<V>(plr, name);
        return store.Get(defaultValue) as V;
    },

    Set<V = unknown>(plr: Player, name: string, value: V): void {
        const store = this.GetRawStore<V>(plr, name);
        store.Set(value);
    },

    Store<V = unknown>(plr: Player, name: string, defaultValue?: V) {
        const store = DataStore2<V>(name, plr);
        const signal: RemoteSignal = this.Client.DataUpdated;
        function callRemote(value: V) {
            signal.Fire(plr, name, value);
        }

        callRemote(store.Get(defaultValue));
        store.OnUpdate(callRemote);
        return store;
    }
});

export = DataManager;