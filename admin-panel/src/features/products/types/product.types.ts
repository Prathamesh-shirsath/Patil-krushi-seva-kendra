export interface Product {
  id: string;

  name: string;

  brand: string;

  categoryId: string;

  image: string;

  images: string[];

  price: number;

  discountedPrice?: number;

  description: string;

  uses: string;

  features?: string;

  cropRecommendation?: string;

  stock: number;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

export type CreateProductInput = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProductInput = Partial<CreateProductInput>;