import { Text } from '../Hi/Components/Basics';

export class Title extends Text {
    constructor(text: string) {
        super(text);
        this.font('xl');
    }
}