import { type User as UserType } from "../../../components/admin/OrderRelated/SelectedUserForOrder"
export const recentSales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00", 
    },
  ];

  export const monthlyData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 1200 },
    { month: "May", revenue: 2500 },
    { month: "Jun", revenue: 4300 },
    { month: "Jul", revenue: 4100 },
    { month: "Aug", revenue: 2300 },
    { month: "Sep", revenue: 3200 },
    { month: "Oct", revenue: 3500 },
    { month: "Nov", revenue: 4500 },
    { month: "Dec", revenue: 3800 },
  ];
  
 export const orders = [
  {
    id: 1,
    user: "Alice Johnson",
    items: ["Vela Aromática Lavanda", "Difusor de Aceites"],
    total: 49.98,
    status: "Pendiente",
  },
  {
    id: 2,
    user: "Bob Smith",
    items: ["Set de Velas de Soja", "Vela de Masaje"],
    total: 59.98,
    status: "Entregado",
  },
  {
    id: 3,
    user: "Charlie Brown",
    items: ["Vela en Tarro de Cristal", "Pack de Velas Tea Light"],
    total: 24.98,
    status: "Pendiente",
  },
  {
    id: 4,
    user: "Diana Ross",
    items: ["Difusor de Aceites", "Vela Aromática Vainilla"],
    total: 54.98,
    status: "Entregado",
  },
];

export const mockUsers: UserType[] = [
  {
    id: 1,
    email: "cliente1@example.com",
    firstName: "Juan",
    lastName: "Pérez",
    address: "Calle Principal 123, Ciudad de México",
    phoneNumber: "+52 555 123 4567",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    email: "cliente2@example.com",
    firstName: "María",
    lastName: "González",
    address: "Av. Reforma 456, Guadalajara",
    phoneNumber: "+52 333 987 6543",
    createdAt: "2023-03-22",
  },
  {
    id: 3,
    email: "cliente3@example.com",
    firstName: "Carlos",
    lastName: "Rodríguez",
    address: "Blvd. Insurgentes 789, Monterrey",
    phoneNumber: "+52 818 456 7890",
    createdAt: "2023-05-10",
  },
  {
    id: 4,
    email: "cliente4@example.com",
    firstName: "Ana",
    lastName: "Martínez",
    createdAt: "2023-07-05",
  },
]