import * as express from 'express';
import * as bodyParser from 'body-parser';

export class HumanServer {
    private readonly app: express.Express;
    private readonly port: string | number;

    constructor(port: string | number) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.port = port;
    }

    get(path: string, handler: express.Handler): void {
        this.app.get(path, handler);
    }

    post(path: string, handler: express.Handler): void {
        this.app.post(path, handler);
    }

    setClient(fullpath: string): void {
        this.app.use(express.static(fullpath));
    }

    start(): void {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`);
        });
    }
}
