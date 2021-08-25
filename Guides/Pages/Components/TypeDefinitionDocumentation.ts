import BlockCode from '@Hi/Components/BlockCode';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import { ScrollView } from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { HTMLContent } from './HTMLContent';

export class TypeDefinitionDocumentation extends VStack {
    constructor(expansion: string, description: string, examples: string) {
        super(
            new HStack(
                new IonIcon('code-working-outline').font('lg').padding(),
                new TextView('Type Definition').padding().width(200).textStart(),
                new BlockCode(expansion).padding().margin(0).textStart(),
                new Spacer()
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new IonIcon('information-outline').font('lg').padding(),
                new TextView('Description').padding().width(200).textStart(),
                new HTMLContent('span', description).textStart().margin(0).padding().width(400),
                new Spacer()
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new IonIcon('code-slash-outline').font('lg').padding(),
                new TextView('Example').padding().width(200).textStart(),
                new ScrollView(new BlockCode(examples).textStart().margin(0).padding().width(400)),
                new Spacer()
            )
                .stretchWidth()
                .alignStart()
        );
    }
}
