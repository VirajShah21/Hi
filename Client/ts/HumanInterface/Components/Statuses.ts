import View from '../View';

export class ProgressLine extends View {
    public progress: number;

    constructor() {
        super('div');
        this.progress = 0;
        this.body.className = 'hi-progress-line';
    }

    async resize(percent: number): Promise<void> {
        return new Promise<void>(resolve => {
            const interval = setInterval(() => {
                this.progress += 0.1;
                if (this.progress >= percent) {
                    clearInterval(interval);
                    resolve();
                }
            }, 5);
        });
    }
}
