import { create } from 'zustand';
import { CartState, Order, UserData } from '../interfaces/cartInterfaces';
import axios from 'axios';



const useCartStore = create<CartState & {
  createOrder: (userData: UserData) => Promise<any>;
}>((set, get) => ({
    items: [],

    addItem: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: item.quantity } : i
                    ),
                };
            } else {
                return { items: [...state.items, item] };
            }
        }),
    
    updateItemQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
            ).filter((item) => item.quantity > 0),
        })),

    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

    clearCart: () => set({ items: [] }),

    createOrder: async (userData) => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 5.99;

        const order: Order = {
            items: state.items,
            total: subtotal + shipping,
            shipping,
            userData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:45623/api/orders', order);
            if (response.status === 200 || response.status === 201) {
                state.clearCart();
                return response.data;
            }
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}));

export default useCartStore;