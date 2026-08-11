const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

export type Category = {
  id: string;

  name: string;

  slug: string;

  image?: string | null;

  status?: boolean;

  parentId?: string | null;

  parent?: Category | null;

  children?: Category[];

  _count?: {
    products?: number;
  };
};

export async function getCategories(): Promise<
  Category[]
> {
  const response = await fetch(
    `${API_URL}/categories`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch categories (${response.status})`
    );
  }

  const result = await response.json();

  const categories = Array.isArray(result?.data)
    ? result.data
    : [];

  /*
   * Only active categories are visible
   * on the customer website.
   */
  return categories.filter(
    (category: Category) =>
      category.status !== false
  );
}