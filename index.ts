export type UserRole = 'admin' | 'merchant' | 'customer';

export type NotificationType =
  | 'new_order' | 'order_status'
  | 'merchant_approved' | 'merchant_rejected' | 'merchant_suspended'
  | 'product_approved' | 'product_rejected'
  | 'new_merchant' | 'new_product_review'
  | 'low_stock' | 'system';

export type NotificationEntity = 'order' | 'product' | 'store' | 'system';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  entity_type: NotificationEntity;
  entity_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  city: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  is_active: boolean;
  is_approved: boolean;
  total_sales: number;
  rating: number;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Product {
  id: string;
  store_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  sku: string | null;
  images: string[];
  is_active: boolean;
  is_featured: boolean;
  is_merchant_product: boolean;
  approval_status: ApprovalStatus;
  views: number;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  stores?: Store;
  categories?: Category;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface Order {
  id: string;
  user_id: string;
  store_id: string | null;
  parent_order_id: string | null;
  status: OrderStatus;
  total: number;
  delivery_fee: number;
  discount_amount: number;
  subtotal: number;
  coupon_id: string | null;
  coupon_code: string | null;
  payment_method: string;
  payment_status: PaymentStatus;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  stores?: Store;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  products?: Product;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  products?: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: Product;
}

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  product_id: string | null;
  category_id: string | null;
  store_id: string | null;
  min_order_amount: number | null;
  coupon_code: string | null;
  usage_limit: number | null;
  usage_count: number;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_by: string | null;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  products?: Product;
  categories?: Category;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount: number | null;
  usage_limit: number | null;
  usage_count: number;
  per_user_limit: number | null;
  is_active: boolean;
  store_id: string | null;
  starts_at: string | null;
  ends_at: string | null;
  created_by: string | null;
  created_at: string;
  stores?: Pick<Store, 'id' | 'name'>;
}

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  discount_amount: number;
  coupon_id?: string;
  coupon_title?: string;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number;
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export type MessageStatus = 'sent' | 'delivered' | 'read';
export type AttachmentType = 'image' | 'file';

export interface Conversation {
  id: string;
  order_id: string;
  customer_id: string;
  merchant_id: string;
  store_id: string | null;
  last_message: string | null;
  last_message_at: string | null;
  customer_unread: number;
  merchant_unread: number;
  created_at: string;
  // joined fields
  customer?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
  merchant?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
  store?: Pick<Store, 'id' | 'name' | 'logo_url'>;
  order?: Pick<Order, 'id' | 'status' | 'total'>;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  attachment_url: string | null;
  attachment_type: AttachmentType | null;
  status: MessageStatus;
  is_deleted: boolean;
  created_at: string;
  sender?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  order_id: string;
  order_item_id: string | null;
  product_id: string | null;
  store_id: string;
  user_id: string;
  rating: number;
  comment: string;
  image_urls: string[];
  is_visible: boolean;
  merchant_reply: string | null;
  merchant_replied_at: string | null;
  created_at: string;
  updated_at: string;
  // joined
  reviewer?: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
  product?: Pick<Product, 'id' | 'name' | 'images'>;
  store?: Pick<Store, 'id' | 'name' | 'logo_url'>;
}
