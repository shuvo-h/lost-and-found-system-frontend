export type TCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TLostItem = {
  id: string;
  userId: string;
  categoryId: string;
  status: string;
  lostItemName: string;
  description: string;
  location: string;
  lostDate: string;
  img: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  category: TCategory;
  // user: User;
};
