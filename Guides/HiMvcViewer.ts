import { HumanColorName, HColor } from '../HumanInterface/Colors';
import { InlineCode } from '../HumanInterface/Components/Basics';
import { Icon } from '../HumanInterface/Components/Graphics';
import { VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';
import { Text } from '../HumanInterface/Components/Basics';

export default class HiMvcViewer extends VStack {
    constructor() {
        super(
            new VStack(
                new Text('Human Interface').font('xxl').bold().margin({ top: 50 }),
                new HStack(
                    new Spacer(),
                    new VStack(new Text('Model'), new Icon('logo-web-component').padding()),
                    new Spacer(),
                    new VStack(new Text('View'), new Icon('eye-outline').padding()),
                    new Spacer(),
                    new VStack(new Text('Controller'), new Icon('game-controller-outline').padding()),
                    new Spacer()
                )
                    .stretch()
                    .padding()
                    .font('xl')
            )
                .stretch()
                .backgroundImage(
                    'https://images.unsplash.com/photo-1564730138332-6b28cb9b991d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1066&q=80'
                )
                .foreground('white')
                .height(500),
            new Text('A model view controller designed for ease of programming and improved user experience.').margin(
                50
            ),

            new Icon('hourglass-outline').font({ size: 100 }).padding(50),
            new Text('Built for speed').font('xl').bold(),

            new Text(
                'Speed is the most important when it comes to resource heavy webapps. HI MVC forgets the virtual DOM, and easily modified small bits of the real DOM to save time and improve resource management.'
            )
                .padding()
                .width('50%')
                .lineHeight('200%'),

            new Icon('logo-apple').font({ size: 100 }).padding(50),
            new Text('Influenced by Apple').font('xl').bold(),
            new Spacer(),
            new Text(
                'The Human Interface Guidelines are defined by Apple – a company known for developing software with consistently easy user experiences. Human Interface MVC takes from these great design principles and implements it in a versatile and configurable model view controller to design Human Interfaces for the web.'
            )
                .padding()
                .width('50%')
                .lineHeight('200%')
                .margin({ bottom: 50 }),

            new VStack(
                DeviceIcons(),

                new Text('Designed for all Devices').font('xl').bold(),

                new Text(
                    'The Human Interface Model View Controller is designed to work nearly flawlessly on all devices and all major web browsers. From phone to tablets, and laptops to smart watches... Human Interface now exists on the web for all platforms.'
                )
                    .padding()
                    .width('50%')
                    .lineHeight('200%'),

                BrowserIcons()
            ).margin({ top: 50, bottom: 50 }),

            new Text('Human Colors').font('xl').bold().padding(50),

            new Text('Light Colors').font('lg').bold().padding({ bottom: 25 }),

            LightColorsShowcase(),

            new Text('Dark Colors').font('lg').padding(25).bold(),

            DarkColorsShowcase()
        );
    }
}

function DeviceIcons() {
    return new HStack(
        new Spacer(),
        new Icon('phone-landscape-outline'),
        new Spacer(),
        new Icon('phone-portrait-outline'),
        new Spacer(),
        new Icon('laptop-outline'),
        new Spacer(),
        new Icon('tablet-landscape-outline'),
        new Spacer(),
        new Icon('tablet-portrait-outline'),
        new Spacer(),
        new Icon('watch-outline'),
        new Spacer()
    )
        .font({ size: 50 })
        .stretch()
        .margin({ bottom: 75 });
}

function BrowserIcons() {
    return new HStack(
        new Spacer(),
        BrowserIcon('logo-chrome', 'blue'),
        new Spacer(),
        BrowserIcon('compass-outline', 'blue'),
        new Spacer(),
        BrowserIcon('logo-firefox', 'orange'),
        new Spacer(),
        BrowserIcon('logo-edge', 'blue'),
        new Spacer(),
        BrowserIcon('logo-electron', 'gray3'),
        new Spacer(),
        BrowserIcon('extension-puzzle-outline', 'green'),
        new Spacer()
    )
        .font({ size: 50 })
        .stretch()
        .margin({ top: 75 })
        .padding({ bottom: 50 });
}

function DarkColorsShowcase() {
    return new HStack(
        new VStack(
            new Spacer(),
            HumanColorShowcase('blue'),
            new Spacer(),
            HumanColorShowcase('indigo'),
            new Spacer(),
            HumanColorShowcase('purple'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('brown'),
            new Spacer(),
            HumanColorShowcase('mint'),
            new Spacer(),
            HumanColorShowcase('red'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('cyan'),
            new Spacer(),
            HumanColorShowcase('orange'),
            new Spacer(),

            HumanColorShowcase('teal'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('green'),
            new Spacer(),
            HumanColorShowcase('pink'),
            new Spacer(),
            HumanColorShowcase('yellow'),
            new Spacer()
        ).stretch()
    )
        .background('black')
        .foreground('white')
        .padding()
        .rounded();
}

function LightColorsShowcase() {
    return new HStack(
        new VStack(
            new Spacer(),
            HumanColorShowcase('blue'),
            new Spacer(),
            HumanColorShowcase('indigo'),
            new Spacer(),
            HumanColorShowcase('purple'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('brown'),
            new Spacer(),
            HumanColorShowcase('mint'),
            new Spacer(),
            HumanColorShowcase('red'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('cyan'),
            new Spacer(),
            HumanColorShowcase('orange'),
            new Spacer(),

            HumanColorShowcase('teal'),
            new Spacer()
        ).stretch(),

        new VStack(
            new Spacer(),
            HumanColorShowcase('green'),
            new Spacer(),
            HumanColorShowcase('pink'),
            new Spacer(),
            HumanColorShowcase('yellow'),
            new Spacer()
        ).stretch()
    );
}

function BrowserIcon(iconName: string, color: HumanColorName) {
    return new Icon(iconName).foreground(HColor(color)).glow(HColor(color));
}

function HumanColorShowcase(hcolor: HumanColorName) {
    return new VStack(
        new HStack(new Text(`${hcolor[0].toUpperCase()}${hcolor.substring(1)}`))
            .width(100)
            .height(100)
            .background(HColor(hcolor))
            .foreground('white')
            .rounded(),
        new Text(HColor(hcolor)).font('sm').padding(),
        new InlineCode(`HColor('${hcolor}')`).font('sm').padding()
    ).padding(25);
}
