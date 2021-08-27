import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import SearchField from './SearchField';
import SettingsOverlay from './SettingsOverlay';

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

function MenuButton(iconName: string, title: string, navigateTo: string) {
    return new ClickButton(
        new HStack(new IonIcon(iconName).font({ size: 25 }), new TextView(title).padding(), new Spacer())
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
            (ev.view.root().getViewById('title') as TextView).model.text = title;
        });
}

function SettingsButton() {
    return new ClickButton(
        new HStack(
            new IonIcon('settings-outline').font({ size: 25 }),
            new TextView('Preferences').padding(),
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
