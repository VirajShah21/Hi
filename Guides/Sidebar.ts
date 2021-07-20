import { HColor } from './Hi/Colors';
import { Button, Text } from './Hi/Components/Basics';
import { Icon } from './Hi/Components/Graphics';
import { TextField } from './Hi/Components/Inputs';
import { VStack, HStack } from './Hi/Components/Stacks';
import { Spacer } from './Hi/Components/Whitespace';
import { ViewController } from './Hi/human';
import View from './Hi/View';

function SmartKeywords(keywords: string[]) {
    const results = [];
    keywords = keywords.map(word => word.trim().toLowerCase());
    for (const keyword of keywords) {
        if (keyword.indexOf(' ') >= 0)
            keyword.split(' ').forEach(word => {
                results.push(word);
            });
        else results.push(keyword);
    }
    return keywords;
}

export default class Sidebar extends VStack {
    static readonly menuItems = [
        {
            view: MenuButton('hand-right-outline', 'Getting Started', 'gettingStarted'),
            keywords: SmartKeywords(['getting started']),
        },
        {
            view: MenuButton('cube-outline', 'Sizing Types', 'sizingTypes'),
            keywords: SmartKeywords(['sizing types', 'type']),
        },
        {
            view: MenuButton('code-working-outline', 'State Types', 'stateTypes'),
            keywords: SmartKeywords(['state types', 'type']),
        },
        {
            view: MenuButton('brush-outline', 'Style Types', 'styleTypes'),
            keywords: SmartKeywords(['style types', 'type']),
        },
        {
            view: MenuButton('text-outline', 'Basic Components', 'basicComponents'),
            keywords: SmartKeywords(['basic components', 'text', 'button', 'padding', 'round', 'rounded', 'margin']),
        },
        {
            view: MenuButton('images-outline', 'Graphics Components', 'graphicsComponents'),
            keywords: SmartKeywords(['graphics', 'graphic', 'images', 'icons']),
        },
    ];

    constructor() {
        super(
            new TextField('Search')
                .stretchWidth()
                .border({ color: HColor('gray6') })
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
                                    Sidebar.menuSearchScore(query, a.keywords) -
                                    Sidebar.menuSearchScore(query, b.keywords)
                            )
                            .map(item => item.view)
                    );
                }),
            new VStack(...Sidebar.menuItems.map(item => item.view)).stretchWidth().id('menu-items-list')
        );
    }

    static menuSearchScore(query: string, keywords: string[]): number {
        const queryWords = query.split(' ');
        let score = 0;
        for (const word of queryWords) {
            if (keywords.indexOf(word) >= 0) score++;
            else
                keywords.forEach(keyword => {
                    if (keyword.indexOf(word) >= 0) score += 0.25;
                });
        }
        return score;
    }
}

function MenuButton(iconName: string, title: string, navigateTo: string) {
    const btn = new Button(new HStack(new Icon(iconName).font({ size: 25 }), new Text(title).padding(), new Spacer()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm');

    btn.whenMouseOver(() => {
        btn.background(HColor('gray6'));
    })
        .whenMouseOut(() => {
            btn.background('none');
        })
        .whenClicked(() => {
            ViewController.navigateTo(navigateTo);
            (btn.root().getViewById('title') as Text).text.value = title;
        });
    return btn;
}
