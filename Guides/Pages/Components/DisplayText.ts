import { HColor } from '@Hi/Colors';
import TextView from '@Hi/Components/TextView';

export function PrimaryHeading(text: string): TextView {
    return new TextView(text).margin({ top: 25 }).font('xl');
}

export function SecondaryHeading(text: string): TextView {
    return new TextView(text).margin({ top: 50 }).font('lg');
}

export function PrimaryText(text: string): TextView {
    return new TextView(text).padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
}

export function SubtleText(text: string): TextView {
    return new TextView(text)
        .padding({ left: 200, right: 200 })
        .margin({ top: 25 })
        .lineHeight('150%')
        .font('sm')
        .foreground(HColor('gray'));
}

export function ImageCaption(text: string): TextView {
    return new TextView(text).padding().margin(0).lineHeight('110%');
}
