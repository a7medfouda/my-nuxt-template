import type { AxiosInstance } from "axios";

export type ButtonKeys =
  | "file_1"
  | "file_2"
  | "file_3"
  | "text_1"
  | "text_2"
  | "text_3";
export type Buttons = Record<ButtonKeys, string>;
// Interfaces
export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  long_description: string;
  image: string;
  gallery: string[];
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ProductsResponse {
  data: Product[];
  links: Links;
  meta: Meta;
}

export interface APIResponse {
  status: boolean;
  message: string;
  data: {
    products: ProductsResponse;
    title: string;
    description: string;
    buttons: Buttons;
  };
}

export const getProducts = async (
  params: {
    category?: string | null;
    brand_ids?: string | null;
    page?: number;
    pageSize?: number;
  } = {},
  lang: string = "en"
): Promise<{
  products: ProductsResponse;
  title: string;
  description: string;
  buttons: Buttons;
}> => {
  const { $api } = useNuxtApp();

  const api = $api as AxiosInstance;
  if (!api) {
    throw new Error(
      "API instance is not available. Ensure Axios plugin is properly configured."
    );
  }

  try {
    const response = await api.get<APIResponse>("/products", {
      params,
      headers: {
        "Accept-Language": lang,
      },
    });

    const { products, title, description, buttons } = response.data.data;

    return { products, title, description, buttons };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
