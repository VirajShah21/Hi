import { HColor, rgba } from '../HumanInterface/Colors';
import { Icon } from '../HumanInterface/Components/Graphics';
import { TextField } from '../HumanInterface/Components/Inputs';
import { ScrollView, VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';
import { Text } from '../HumanInterface/Components/Basics';

export default class ChatbotViewer extends ScrollView {
    constructor() {
        super(
            new Spacer(),

            new VStack(
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!"),
                new GrayBubble('Wow! We can send messages to each other!!!'),
                new BlueBubble("Hey, what's up bro!")
            )
                .fixed()
                .setBottom(50)
                .width('calc(100% - 300px)'),

            new BottomBar()
                .fixed()
                .setBottom(0)
                .width('calc(100% - 300px)')
                .borderTop({ size: 1, style: 'solid', color: HColor('gray6') })
                .padding(2)
                .font('lg')
                .background(rgba(255, 255, 255, 0.5))
                .blur(50)
        );
    }
}

class BlueBubble extends HStack {
    constructor(message: string) {
        super(
            new Spacer(),
            new Text(message)
                .background(HColor('blue'))
                .padding({ top: 5, right: 15, bottom: 5, left: 15 })
                .rounded(100)
                .font('md')
                .margin({ right: 25 })
                .foreground('white')
        );
        this.stretchWidth().margin(5);
        this.body.style.borderBottomRightRadius = '0';
    }
}

class GrayBubble extends HStack {
    constructor(message: string) {
        super(
            new Text(message)
                .background(HColor('gray3'))
                .padding({ top: 5, right: 15, bottom: 5, left: 15 })
                .rounded(15)
                .rounded({ bottom: { left: 0 } })
                .font('md')
                .margin({ left: 25 }),
            new Spacer()
        );
        this.stretchWidth().margin(5);
    }
}

class BottomBar extends HStack {
    constructor() {
        super(
            new Icon('trash').foreground(HColor('red')).title('Delete Conversation').padding(),
            new Icon('mail-outline').foreground(HColor('blue')).title('Continue Conversation via Email').padding(),
            new Icon('information-circle-outline').foreground(HColor('blue')).title('Information/Help').padding(),
            new TextField('Send a Message').rounded().stretch().background('none'),
            new Icon('paper-plane').padding().foreground(HColor('blue')).title('Send Message')
        );
    }
}
