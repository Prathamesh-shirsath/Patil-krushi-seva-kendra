export interface CreateCategoryInput {
  name: string;
  slug: string;
  image?: string;
  parentId?: string | null;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  image?: string;
  parentId?: string | null;
}