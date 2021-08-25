import { HColor } from '@Hi/Colors';
import { ScrollView } from '@Hi/Components/ScrollView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class MessageViewer extends ScrollView {
    constructor() {
        super(new VStack(new TextView('Select a menu item').foreground(HColor('gray'))).stretch());
    }
}
