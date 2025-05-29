export const product = [
    {
      categoryId:1,
      id: 1,
      name: "Vela Aromática Lavanda",
      price: 19.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Vela aromática de lavanda hecha a mano con cera de soja natural y aceites esenciales.",
    },
    {
      categoryId:1,
      id: 2,
      name: "Set de Velas de Vainilla",
      price: 29.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Set de 3 velas de vainilla con diferentes tamaños, perfectas para crear un ambiente acogedor.",
    },
    {
      categoryId:1,
      id: 3,
      name: "Difusor de Aceites Esenciales",
      price: 39.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Difusor ultrasónico para aceites esenciales con luz LED de colores cambiantes.",
    },
    {
      categoryId:1,
      id: 4,
      name: "Vela de Soja Cítrica",
      price: 24.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Vela de soja con aroma cítrico refrescante, ideal para energizar espacios.",
    },
    {
      categoryId:1,
      id: 5,
      name: "Set de Mini Velas Aromáticas",
      price: 34.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Set de 6 mini velas aromáticas con diferentes fragancias para variar el ambiente.",
    },
    {
      categoryId:1,
      id: 6,
      name: "Vela de Madera y Ámbar",
      price: 27.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Vela con aroma a madera y ámbar en un elegante recipiente de vidrio.",
    },
  ];
  
  export const soldProducts = [
    {
      categoryId:1,
      id: 7,
      name: "Vela Aromática de Jazmín",
      price: 22.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Vela aromática con fragancia de jazmín, perfecta para relajarse después de un largo día.",
    },
    {
      categoryId:1,
      id: 8,
      name: "Set de Velas Flotantes",
      price: 19.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Set de 12 velas flotantes sin aroma, ideales para decorar piscinas o centros de mesa.",
    },
    {
      categoryId:1,
      id: 9,
      name: "Vela de Masaje",
      price: 32.99,
      imageUrl: "/placeholder.svg?height=200&width=200",
      description:
        "Vela de masaje que se derrite en un aceite cálido y aromático para una experiencia relajante.",
    },
  ];

  export const categories = [
    { name: "Ropa", description: "Moderna y colorida, para todas las ocasiones.",isAvailable: true,id:1 },
    { name: "Hogar", description: "Artículos esenciales y decorativos para el hogar.",isAvailable: true,id:2 },
    { name: "Deportes", description: "Equipamiento y ropa deportiva de alta calidad." ,isAvailable: false,id:3 },
    { name: "Belleza", description: "Productos de belleza y cuidado personal.",isAvailable: true, id:4  },
    { name: "Velas Aromaticas", description: "Velas con fragancias relajantes y energizantes.",isAvailable: true,id:5  },
    { name: "Dulces", description: "Deliciosos dulces y golosinas para todos los gustos.",isAvailable: false, id:6  },
  ];

  export const relatedProducts = [
    {
      id: 2,
      name: 'Vela de Vainilla',
      price: 24.99,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'Vela de Canela',
      price: 26.99,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'Vela de Sándalo',
      price: 29.99,
      image: '/placeholder.svg?height=200&width=200',
    }
  ]

  export const producto = {
    id: 1,
    name: 'Vela Aromática de Lavanda Premium',
    price: 29.99,
    description: 'Vela aromática artesanal de lavanda, elaborada con cera de soja 100% natural y aceites esenciales puros. Perfecta para crear un ambiente relajante y aromático en cualquier espacio.',
    imageUrl: '/placeholder.svg?height=600&width=600',
  }
  
  export  const usuarios = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Fiona Apple",
    email: "fiona@example.com",
    image: "/placeholder.svg",
  },
];

export const REVIEWS = [
  {
    id: 1,
    author: "María García",
    rating: 5,
    comment: "Excelente producto, superó mis expectativas. La calidad es increíble y el aroma dura muchísimo.",
    date: "2 semanas atrás",
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    rating: 4,
    comment:
        "Muy buen producto, me encanta el aroma. Solo le quito una estrella porque el envío tardó un poco más de lo esperado.",
    date: "1 mes atrás",
  },
  {
    id: 3,
    author: "Ana Martínez",
    rating: 5,
    comment: "Increíble calidad, definitivamente compraré más. El aroma es sutil pero duradero.",
    date: "2 meses atrás",
  },
]

// Mock data for related products
export const RELATED_PRODUCTS = [
  { id: 101, name: "Vela Aromática Lavanda", price: 24.99, imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 102, name: "Vela Aromática Vainilla", price: 22.99, imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 103, name: "Vela Aromática Canela", price: 26.99, imageUrl: "/placeholder.svg?height=400&width=400" },
]

// Available colors and sizes
export const colors = [
  { name: "Amber", value: "bg-amber-500" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Indigo", value: "bg-indigo-500" },
]

export const sizes = ["Small", "Medium", "Large"]

export const recentOrders = [
  { id: '1', date: '2023-05-15', total: 59.99, status: 'Entregado' },
  { id: '2', date: '2023-06-02', total: 89.99, status: 'En camino' },
  { id: '3', date: '2023-06-20', total: 39.99, status: 'Procesando' },
]

export const ProductRecomended = [
  { id: 1, name: 'Producto 1', price: 10.99, imageUrl: '/placeholder.svg' },
  { id: 2, name: 'Producto 2', price: 12.99, imageUrl: '/placeholder.svg' },
  { id: 3, name: 'Producto 3', price: 8.99, imageUrl: '/placeholder.svg' },
  { id: 4, name: 'Producto 4', price: 15.99, imageUrl: '/placeholder.svg' },
]

export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
}

export interface ProductCarouselProps {
  product: Product[]
  title?: string
}