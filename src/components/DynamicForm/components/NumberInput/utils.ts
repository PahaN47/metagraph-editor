import { NumberInputProps } from ".";

export const getNumberInputLimits = ({
    min,
    max,
    lessThan,
    moreThan,
    positive,
    negative,
}: Pick<
    NumberInputProps,
    "min" | "max" | "lessThan" | "moreThan" | "positive" | "negative"
>) => {
    let absMin: number = -Infinity;
    let absMax: number = Infinity;
    if (min != null) {
        absMin = min;
    }
    if (moreThan && moreThan > absMin) {
        absMin = moreThan;
    }
    if (positive && 0 > absMin) {
        absMin = 0;
    }
    if (max != null) {
        absMax = max;
    }
    if (lessThan && lessThan < absMax) {
        absMax = lessThan;
    }
    if (negative && 0 < absMax) {
        absMax = 0;
    }

    const leftBracket =
        Number.isFinite(absMin) && absMin !== moreThan ? "[" : "(";
    const rightBracket =
        Number.isFinite(absMax) && absMax !== lessThan ? "]" : ")";
    return `${leftBracket}${Number.isFinite(absMin) ? absMin : "-\u221E"}; ${
        Number.isFinite(absMax) ? absMax : "\u221E"
    }${rightBracket}`;
};
