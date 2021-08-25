import IonIcon from '@Hi/Components/IonIcon';

export default class MajorIcon extends IonIcon {
    constructor(name: string) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}
