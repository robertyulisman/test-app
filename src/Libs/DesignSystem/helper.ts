import { getFontSize } from '@src/Utils';

export type OpacityType = 10 | 25 | 50 | 75 | 90;
export type TransparencyType = {
  [key in OpacityType]: string;
};

export const createTransparencyObject = (color: string, opacities: OpacityType[]) => {
  return opacities.reduce((acc, opacity) => {
    acc[opacity] = `rgba(${color}, ${opacity / 100})`;
    return acc;
  }, {} as TransparencyType);
};

export const createFontStyle = (fontFamily: string, fontSize: number, lineHeight: number) => ({
  fontFamily,
  fontSize: getFontSize(fontSize),
  lineHeight: getFontSize(lineHeight),
  letterSpacing: 0.1,
});

export const opacities: OpacityType[] = [10, 25, 50, 75, 90];
