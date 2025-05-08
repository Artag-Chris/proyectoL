export interface GetAllOrdersResponse {
    id:            number;
    totalAmount:   number;
    createdAt:     Date;
    userId:        number;
    orderStatusId: number;
    isAvailable:   boolean;
    orderItems:    OrderItem[];
    transactions:  Transaction[];
}

export interface OrderItem {
    id:          number;
    quantity:    number;
    price:       number;
    orderId:     number;
    productId:   number;
    isAvailable: boolean;
}

export interface Transaction {
    id:              number;
    amount:          number;
    transactionDate: Date;
    paymentMethod:   string;
    orderId:         number;
    isAvailable:     boolean;
}
