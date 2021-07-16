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
