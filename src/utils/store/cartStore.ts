import { create } from 'zustand';

interface CartState {
    items: { id: number; name: string; quantity: number; price: number; imageUrl: string }[];
    addItem: (item: { id: number; name: string; quantity: number; price: number; imageUrl: string }) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateItemQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartState>((set) => ({
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
}));

export default useCartStore;