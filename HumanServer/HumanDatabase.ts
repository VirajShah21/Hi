import { MongoClient, Db, MongoClientOptions, Collection } from 'mongodb';

export default class HumanDatabase {
    private readonly client: MongoClient;
    private database?: Db;

    constructor(uri: string) {
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as unknown as MongoClientOptions);
        this.client.connect(() => {
            this.database = this.client.db();
        });
    }

    collection<TSchema>(name: string): Collection<TSchema> {
        return this.database?.collection(name) as Collection<TSchema>;
    }

    close(): void {
        this.client.close();
    }
}
