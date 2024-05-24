export type   TFoundItem ={
    categoryId: string;
    foundItemName: string;
    description: string;
    location: string;
    foundDate: string; 
    claim_process: string;
    phone: string;
    email: string;
    img: string;
}

export type TfoundItemPartial = Partial<TFoundItem> & {id?:string}