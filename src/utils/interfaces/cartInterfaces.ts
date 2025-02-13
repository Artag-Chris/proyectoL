export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface Order {
    items: CartState['items'];
    total: number;
    shipping: number;
    userData: UserData;
    status: string;
    createdAt: string;
  }

export interface CartState {
    items: { id: number; name: string; quantity: number; price: number; imageUrl: string }[];
    addItem: (item: { id: number; name: string; quantity: number; price: number; imageUrl: string }) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

export interface UserData {
    name: string;
    email: string;
    address: string;
    phone: string;
  }