import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import TextView from '@Hi/Components/TextView';

export default class Titlebar extends HStack {
    constructor() {
        super(new TextView('Title').id('title'));
        this.width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .padding(20)
            .borderBottom({
                size: 1,
                style: 'solid',
                color: HColor('gray5'),
            })
            .position('fixed')
            .background(HColor('background').alpha(0.25))
            .blur(25)
            .zIndex(10);
    }

    override handle(data: string): void {
        if (data == 'color') this.border({ color: HColor('gray5') });
    }
}
