export interface User {
  id?: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  images?: string[];
  description?: string;
  longDescription?: string;
  specifications?: Record<string, string>;
  stock: number;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  options?: {
    sizes?: string[]
    colors?: string[]
  }
}

export interface CartItem extends Product {
  cartItemId: string; // unique id for this cart line (product + selected options)
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: ShippingInfo;
  createdAt: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, opts?: { selectedSize?: string; selectedColor?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart?: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}
