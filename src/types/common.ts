export type TMeta = {
    page: number
    limit: number
    total: number
}

export type TResponseSuccess = {
    data: any;
    meta?: TMeta;
}
export type TResponseError = {
    statusCode: number;
    message: string;
    errorDetails: {issues:TResponseErrorMessage[]};
}

export type TResponseErrorMessage = {
    field: string|number;
    message: string;
}
