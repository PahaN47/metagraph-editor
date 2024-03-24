export type ValidationErrors = {
    [K in string]: {
        message?: string;
        type?: string;
    };
};
