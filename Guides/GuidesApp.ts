import { HColor, rgba } from './Hi/Colors';
import { HIFullScreenView, HStack, VStack, ScrollView } from './Hi/Components/Stacks';
import { ViewController } from './Hi/human';
import { Text } from './Hi/Components/Basics';
import Sidebar from './Sidebar';
import SignupViewer from './SignupViewer';
import GettingStarted from './Pages/GettingStarted';
import SizingTypes from './Pages/SizingTypes';

export default class GuidesApp extends HIFullScreenView {
    public portfolioViewerController = new ViewController({
        signup: new SignupViewer().stretch().padding({ top: 60 }),
        gettingStarted: new GettingStarted().stretch().padding({ top: 60 }),
        sizingTypes: new SizingTypes().stretch().padding({ top: 60 }),
    });

    constructor() {
        super(
            new HStack(
                new Sidebar()
                    .alignStart()
                    .stretchHeight()
                    .padding(20)
                    .borderRight({ size: 1, style: 'solid', color: HColor('gray6') })
                    .width({
                        min: 300,
                        max: 300,
                        default: 300,
                    }),
                new VStack(
                    new HStack(new Text('Title').id('title'))
                        .width({
                            min: 'calc(100vw - 300px)',
                            default: 'calc(100vw - 300px)',
                            max: 'calc(100vw - 300px)',
                        })
                        .padding(20)
                        .borderBottom({
                            size: 1,
                            style: 'solid',
                            color: HColor('gray6'),
                        })
                        .position('fixed')
                        .background(rgba(255, 255, 255, 0.5))
                        .blur(25)
                        .zIndex(10),
                    new MessageViewer().id('portfolio-viewer').stretch()
                )
                    .stretch()
                    .alignStart()
            ).stretch()
        );
        const portfolioViewer = this.getViewById('portfolio-viewer');
        if (portfolioViewer) this.portfolioViewerController.bind(portfolioViewer.body);
    }
}

class MessageViewer extends ScrollView {
    constructor() {
        super(new VStack(new Text('Select a menu item').foreground(HColor('gray'))).stretch());
    }
}