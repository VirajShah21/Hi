import { HColor, rgba, RGBAModel, whichTheme } from '@Hi/Colors';
import { HIFullScreenView, HStack, VStack, ScrollView } from '@Hi/Components/Stacks';
import { TextContent } from '@Hi/Components/Basics';
import Sidebar from './Sidebar';
import GettingStarted from './Pages/GettingStarted';
import SizingTypes from './Pages/SizingTypes';
import BasicComponents from './Pages/BasicComponents';
import GraphicsComponent from './Pages/GraphicsComponents';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';

export default class GuidesApp extends HIFullScreenView {
    public portfolioViewerController = new ViewController({
        gettingStarted: new GettingStarted().stretch().padding({ top: 60 }),
        sizingTypes: new SizingTypes().stretch(),
        basicComponents: new BasicComponents().stretch(),
        graphicsComponents: new GraphicsComponent().stretch(),
    });

    constructor() {
        super(
            new HStack(
                new Sidebar(),
                new VStack(new Titlebar().id('titlebar'), new MessageViewer().id('portfolio-viewer').stretch())
                    .stretchHeight()
                    .width({
                        min: 'calc(100vw - 300px)',
                        default: 'calc(100vw - 300px)',
                        max: 'calc(100vw - 300px)',
                    })
                    .alignStart()
            ).stretch()
        );
        this.background(HColor('background')).foreground(HColor('foreground'));
        const portfolioViewer = this.getViewById('portfolio-viewer');
        if (portfolioViewer) this.portfolioViewerController.bind(portfolioViewer.body);
    }

    override handle(data: string): void {
        console.log('Handling guides app');
        if (data == 'color') {
            if (whichTheme() == 'dark') {
                this.background(RGBAModel.BLACK).foreground(RGBAModel.WHITE);
                (this.getViewById('titlebar') as View).background(rgba(0, 0, 0, 0.5)).foreground(RGBAModel.WHITE);
            } else {
                this.background(RGBAModel.WHITE).foreground(RGBAModel.BLACK);
                (this.getViewById('titlebar') as View).background(rgba(255, 255, 255, 0.5)).foreground(RGBAModel.BLACK);
            }
        }

        for (const screenName in this.portfolioViewerController.screens)
            this.portfolioViewerController.screens[screenName].signal(data);
    }
}

class Titlebar extends HStack {
    constructor() {
        super(new TextContent('Title').id('title'));
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

class MessageViewer extends ScrollView {
    constructor() {
        super(new VStack(new TextContent('Select a menu item').foreground(HColor('gray'))).stretch());
    }
}
