import axios from 'axios';
import { toast } from 'sonner';

interface OrderData {
  userId: string | number;
  products: Array<{
    productId: string | number;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  status: string;
}

interface CreateOrderParams {
  selectedUser: { id: string | number } | null;
  selectedProducts: Array<{
    id: string | number;
    quantity: number;
    price: number;
    discount?: number;
  }>;
  paymentMethod: string;
  orderStatus: string;
  calculateOrderTotal: () => number;
  resetForm: () => void;
}

export const sendOrder = async ({
  selectedUser,
  selectedProducts,
  paymentMethod,
  orderStatus,
  calculateOrderTotal,
  resetForm
}: CreateOrderParams): Promise<void> => {
  // Validación de campos requeridos
  if (!selectedUser || selectedProducts.length === 0 || !paymentMethod || !orderStatus) {
    toast.error("Por favor completa todos los campos requeridos");
    return;
  }

  try {
    // Configurar datos del pedido
    const orderData = {
        totalAmount: calculateOrderTotal(),
        userId: selectedUser.id,
        orderStatusId:1, //getOrderStatusId(orderStatus), // Necesitarás una función para convertir el status a ID
        orderItems: selectedProducts.map(p => ({
          productId: p.id,
          quantity: p.quantity,
          price: p.discount ? p.price - (p.price * p.discount) / 100 : p.price
        })),
        transactions: [
          {
            amount: calculateOrderTotal(),
            paymentMethod: paymentMethod
          }
        ]
      };
    // Mostrar estado de carga
    const loadingToast = toast.loading("Creando pedido...");

    // Enviar solicitud POST con Axios
    const response = await axios.post(
      'http://localhost:45623/api/pedidos/create', // URL dummy
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dummy-token' // Si es necesario
        }
      }
    );

    // Manejar respuesta exitosa
    toast.dismiss(loadingToast);
    
    if (response.status === 201) {
      toast.success("¡Pedido creado correctamente!");
      resetForm();
      console.log("Respuesta del servidor:", response.data);
    }

  } catch (error) {
    // Manejar errores
    toast.dismiss();
    
    if (axios.isAxiosError(error)) {
      toast.error(`Error al crear pedido: ${error.response?.data?.message || error.message}`);
      console.error("Detalles del error:", error.response?.data);
    } else {
      toast.error("Error desconocido al crear el pedido");
      console.error("Error:", error);
    }
  }
};