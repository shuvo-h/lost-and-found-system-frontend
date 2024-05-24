export type TLostItem ={
    categoryId: string;
    lostItemName: string;
    status: string;
    description: string;
    location: string;
    lostDate: string; 
    img: string; 
    phone: string;
    email: string;
}


export type TLostItemPartial = Partial<TLostItem> & {id?:string}