import { HColor } from '@Hi/Colors';
import TextField from '@Hi/Components/TextField';
import View from '@Hi/View';
import Sidebar from './Sidebar';

export default class SearchField extends TextField {
    constructor() {
        super('Search');
        this.stretchWidth()
            .border({ color: HColor('gray5') })
            .margin({ bottom: 20 })
            .whenChanged(ev => {
                const target = ev.view.parent?.getViewById('menu-items-list') as View;
                const query = (ev.view as TextField).attributes.value.trim().toLowerCase();
                target.removeAllChildren();
                target.addChildren(
                    ...Sidebar.menuItems
                        .filter(item => {
                            const score = Sidebar.menuSearchScore(query, item.keywords);
                            return score != 0 && score / query.split(' ').length >= 0.25;
                        })
                        .sort(
                            (a, b) =>
                                Sidebar.menuSearchScore(query, a.keywords) - Sidebar.menuSearchScore(query, b.keywords)
                        )
                        .map(item => item.view)
                );
            })
            .background(HColor('background'))
            .foreground(HColor('foreground'));
    }

    override handle(data: string): void {
        if (data == 'color') {
            this.background(HColor('background')).foreground(HColor('foreground'));
            this.border({ color: HColor('gray5') });
        }
    }
}
