import { HColor, rgba, RGBAModel, whichTheme } from '@Hi/Colors';
import Sidebar from './Sidebar';
import GettingStarted from './Pages/GettingStarted';
import SizingTypes from './Pages/SizingTypes';
import BasicComponents from './Pages/BasicComponents';
import GraphicsComponent from './Pages/GraphicsComponents';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import VStack from '@Hi/Components/VStack';
import MessageViewer from './MessageViewer';
import Titlebar from './Titlebar';

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
