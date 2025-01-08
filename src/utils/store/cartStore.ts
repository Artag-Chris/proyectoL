import { create } from 'zustand';

// Definimos la interfaz para el estado del carrito
interface CartState {
    items: { id: number; name: string; quantity: number; price: number; imageUrl: string }[];
    addItem: (item: { id: number; name: string; quantity: number; price: number; imageUrl: string }) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

// Creamos el store usando zustand
const useCartStore = create<CartState>((set) => ({
    // Estado inicial del carrito
    items: [],

    // Función para agregar un item al carrito
    addItem: (item) =>
        set((state) => {
            // Verificamos si el item ya está en el carrito
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                // Si el item ya está en el carrito, incrementamos la cantidad
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            } else {
                // Si el item no está en el carrito, lo agregamos
                return { items: [...state.items, item] };
            }
        }),

    // Función para remover un item del carrito
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),

    // Función para limpiar el carrito
    clearCart: () => set({ items: [] }),
}));

export default useCartStore;