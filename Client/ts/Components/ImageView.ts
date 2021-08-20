import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class ImageView extends View {
    public override body: HTMLImageElement;
    public data = StateObject(
        {
            source: '',
            altText: '',
        },
        p => {
            if (p == 'source') this.body.src = this.data.source;
            else if (p == 'altText') this.body.alt = this.data.altText;
        }
    );

    constructor(source: string, altText?: string) {
        super('img');
        this.data.source = source;
        if (altText) this.data.altText = altText;
    }
}
