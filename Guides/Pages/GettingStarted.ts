import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import { Container } from '@Hi/Components/Container';
import HStack from '@Hi/Components/HStack';
import ImageContent from '@Hi/Components/ImageView';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextContent from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ImageCaption, PrimaryHeading, PrimaryText, SubtleText, SecondaryHeading } from './Components/DisplayText';
import { FileTreeItem } from './Components/FileTreeItem';
import MajorIcon from './Components/MajorIcon';

export default class GettingStarted extends Container {
    constructor() {
        super(
            new VStack(
                new ImageContent(
                    'https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80'
                ).stretchWidth(),
                ImageCaption('Photo by Belinda Fewings'),

                new MajorIcon('accessibility-outline'),

                PrimaryHeading('Human Interface?').font('xl'),
                PrimaryText(
                    'If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'
                ),
                PrimaryText(
                    'The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'
                ),
                PrimaryText(
                    'The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'
                ),
                SubtleText('Please note that this project is under heavy development and is due to many changes.'),

                new MajorIcon('cloud-download-outline'),
                PrimaryHeading('Downloading HI MVC').font('xl'),
                PrimaryText(
                    'Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'
                ),
                new ClickButton(
                    new HStack(
                        new IonIcon('logo-github').font('xl'),
                        new TextContent('Github Repository').font('md').margin({ left: 10 })
                    )
                ),

                new MajorIcon('hammer-outline'),
                PrimaryHeading('Installation').font('xl'),
                SecondaryHeading('Step 1: SCSS Compilation').font('lg'),
                PrimaryText(
                    'This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'
                ),
                PrimaryText(
                    'In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'
                ),
                PrimaryText('Copy the file to your static directory'),
                SubtleText('This process assumes you have SASS install globally on your system.'),

                SecondaryHeading('Step 2: Configure TypeScript').font('lg'),

                PrimaryText(
                    'TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'
                ),

                new ImageContent('assets/getting-started/tsconfig.png').margin({ top: 25 }),

                SecondaryHeading('Step 3: Configure Directory Structure'),

                new HStack(
                    new Spacer(),
                    new VStack(
                        new FileTreeItem('folder-outline', 'css').iconColor(HColor('blue')),
                        new FileTreeItem('logo-css3', 'hi.css', 1).iconColor(HColor('blue')),
                        new FileTreeItem('map-outline', 'hi.css.map', 1).iconColor(HColor('green')),
                        new FileTreeItem('text-outline', 'fonts').iconColor(HColor('teal')),
                        new FileTreeItem('logo-html5', 'index.html').iconColor(HColor('orange'))
                    )
                        .alignStart()
                        .rounded()
                        .padding()
                        .background(HColor('gray6'))
                        .margin({ top: 25, right: 25 }),

                    new VStack(
                        PrimaryText(
                            'Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.'
                        )
                            .padding(0)
                            .textStart(),
                        PrimaryText(
                            'You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.'
                        )
                            .padding(0)
                            .textStart()
                    ).width('50%'),
                    new Spacer()
                ),

                SecondaryHeading('Step 4: ')
            )
        );
    }
}
