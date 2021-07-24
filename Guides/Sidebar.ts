import { ColorConfiguration, HColor, RGBAModel } from './Hi/Colors';
import { ClickButton, RadioButton, RadioGroup, TextContent } from './Hi/Components/Basics';
import { IonIcon } from './Hi/Components/Graphics';
import { TextField } from './Hi/Components/Inputs';
import { Overlay } from './Hi/Components/Overlays';
import { VStack, HStack } from './Hi/Components/Stacks';
import { Spacer } from './Hi/Components/Whitespace';
import { StateObject, ViewController } from './Hi/human';
import View from './Hi/View';
import { ViewControllerData } from './Hi/human';

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
        {
            view: SettingsButton(),
            keywords: SmartKeywords(['settings', 'preferences', 'light', 'dark', 'mode']),
        },
    ];

    constructor() {
        super(
            new SearchField(),
            new VStack(...Sidebar.menuItems.map(item => item.view), new Spacer()).stretchWidth().id('menu-items-list')
        );

        this.alignStart()
            .stretchHeight()
            .padding(20)
            .borderRight({ size: 1, style: 'solid', color: HColor('gray5') })
            .width({
                min: 300,
                max: 300,
                default: 300,
            });
    }

    override handle(): void {
        this.border({ color: HColor('gray5') });
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

class SearchField extends TextField {
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
            });
    }

    override handle(data: string): void {
        if (data == 'color') {
            this.background(HColor('background')).foreground(HColor('foreground'));
            this.border({ color: HColor('gray5') });
        }
    }
}

function MenuButton(iconName: string, title: string, navigateTo: string) {
    return new ClickButton(
        new HStack(new IonIcon(iconName).font({ size: 25 }), new TextContent(title).padding(), new Spacer())
    )
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => {
            ev.view.background(HColor('gray6'));
        })
        .whenMouseOut(ev => {
            ev.view.background('none');
        })
        .whenClicked(ev => {
            ViewController.navigateTo(navigateTo);
            (ev.view.root().getViewById('title') as TextContent).text.value = title;
        });
}

function SettingsButton() {
    return new ClickButton(
        new HStack(
            new IonIcon('settings-outline').font({ size: 25 }),
            new TextContent('Preferences').padding(),
            new Spacer()
        )
    )
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => ev.view.background(HColor('gray6')))
        .whenMouseOut(ev => {
            ev.view.background('none');
        })
        .whenClicked(() => {
            new SettingsOverlay();
        });
}

class SettingsOverlay extends Overlay {
    public settings = StateObject(
        {
            color: 'light',
        },
        prop => {
            if (prop == 'color') {
                if (this.settings.color == 'light') {
                    this.lightRadio.setSelected(true);
                    this.darkRadio.setSelected(false);
                    ColorConfiguration.theme = 'light';
                } else {
                    this.lightRadio.setSelected(false);
                    this.darkRadio.setSelected(true);
                    ColorConfiguration.theme = 'dark';
                }

                for (const controller of ViewControllerData.controllers) {
                    controller.signal('color');
                }
            }
        }
    );

    private lightRadio: RadioButton;
    private darkRadio: RadioButton;

    constructor() {
        super(
            new VStack(
                new TextContent('Color Mode').font('xl'),
                new HStack(
                    new HStack(
                        new RadioButton()
                            .padding()
                            .id('light-radio-button')
                            .whenClicked(() => {
                                this.settings.color = 'light';
                            }),
                        new TextContent('Light')
                    ).padding(),
                    new HStack(
                        new RadioButton()
                            .padding()
                            .id('dark-radio-button')
                            .whenClicked(() => {
                                this.settings.color = 'dark';
                            }),
                        new TextContent('Dark')
                    ).padding()
                ).stretchWidth(),
                new HStack(
                    new ClickButton(
                        new VStack(new IonIcon('close-circle-outline'), new TextContent('Close').font('sm'))
                    ).whenClicked(ev => {
                        this.destroy();
                    })
                )
            ).stretch()
        );

        this.lightRadio = this.getViewById('light-radio-button') as RadioButton;
        this.darkRadio = this.getViewById('dark-radio-button') as RadioButton;
        new RadioGroup(this.lightRadio, this.darkRadio);
    }
}
