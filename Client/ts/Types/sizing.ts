export type HISizingValue = string | number;
export type HISizeBounds =
    | HISizingValue
    | {
          min?: HISizingValue;
          max?: HISizingValue;
          default?: HISizingValue;
      };
export type HIEdgeSizingValue =
    | HISizingValue
    | {
          top?: HISizingValue;
          right?: HISizingValue;
          bottom?: HISizingValue;
          left?: HISizingValue;
      };
export type HICornerSizingValue =
    | HISizingValue
    | {
          top?: { left?: HISizingValue; right?: HISizingValue };
          bottom?: { left?: HISizingValue; right?: HISizingValue };
      };

export type HISizingName = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const SizingValues = {
    BORDER_RADIUS: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },

    PADDING: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },

    FONT: {
        xxs: sizing(5),
        xs: sizing(10),
        sm: sizing(12),
        md: sizing(15),
        lg: sizing(18),
        xl: sizing(25),
        xxl: sizing(30),
    },
};

export function sizing(size: HISizingValue): string {
    if (typeof size == 'number') return `${size}px`;
    return size;
}
