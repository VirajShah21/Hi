import { HColor } from '../HumanInterface/Colors';
import { Button, Text } from '../HumanInterface/Components/Basics';
import { Icon } from '../HumanInterface/Components/Graphics';
import { TextField } from '../HumanInterface/Components/Inputs';
import { AlertOverlay } from '../HumanInterface/Components/Overlays';
import { VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';
import { ViewController } from '../HumanInterface/human';
import View from '../HumanInterface/View';

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
            view: MenuButton('person-circle', 'About Me', 'about'),
            keywords: SmartKeywords(['about me', 'viraj shah', 'information']),
        },
        {
            view: MenuButton('brush-outline', 'Human Interface MVC', 'himvc').whenClicked(() => {
                new AlertOverlay(
                    "Fun Fact: This entire webpage was written using the Human Interface Model View Controller framework. It is developed and maintained by Viraj Shah (that's me)!"
                );
            }),
            keywords: SmartKeywords(['human interface', 'design', 'mvc', 'model view controller']),
        },
        {
            view: MenuButton('chatbubbles', 'Contact Me via Chatbot', 'contact'),
            keywords: SmartKeywords(['contact me', 'chatbot', 'chat bot']),
        },
        {
            view: MenuButton('log-in', 'Login', 'login'),
            keywords: SmartKeywords(['login', 'log in', 'sign in', 'account']),
        },
        {
            view: MenuButton('person-add', 'Register Account', 'signup'),
            keywords: ['register', 'account', 'sign up'],
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
