// interfaces 🎉🎉🎉🎉🎉
export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: number;
}
export interface IArticles {
  article: {
    id: string | number;
    title?: string;
    description?: string;
    date?: string;
    head?: string;
    thumbnail?: string;
  };
}
export interface IFirst_section {
  button_text_1: string;
  button_text_2: string;
  description: string;
  image: string;
  title: string;
}
export interface ISecond_section {
  button_text: string;
  title: string;
}
export interface IThird_section {
  button_text: string;
  title: string;
  description: string;
}
export interface IFourth_section {
  description: string;
  title: string;
  video: string;
}
export interface IFifth_Section {
  button_text: string;
  description: string;
  title: string;
}
export interface ISixth_Section {
  title: string;
  description: string;
  image: string;
}
export interface IFCard {
  button_text: string;
  title: string;
}
export interface ICertificates {
  description?: string;
  title: string;
}
export interface INinth_section {
  title: string;
}
export interface ITenth_Section {
  title: string;
  button_text: string;
  description: string;
}
export interface IContact_Section {
  title: string;
  description: string;
}
export interface IAbout {
  title: string;
  description: string;
  header_button_1: string;
  header_button_2: string;
  header_image: string;
  numbers: INumber[];
  story_title: string;
  story_description: string;
  story_button: string;
  story_image: string;
  partners_title: string;
  values_title: string;
  values_description: string;
}

export interface INumber {
  id: string | number;
  text: string;
  number: string;
  sign: string;
}

export interface IPartner {
  id: number;
  name: string;
  logo: string;
}

export interface IValue {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

export interface IAboutUsData {
  about: IAbout;
  partners: IPartners[];
  values: IValue[];
}

export interface IAboutUsPage {
  status: boolean;
  message: string;
  data: IAboutUsData;
}
export interface BlogResponse {
  status: boolean;
  message: string;
  data: BlogData;
}

export interface BlogData {
  blog: Blog;
  relatedBlogs: Blog[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  date: string;
  image: string;
}
export interface ICategories {
  id: string | undefined;
  created_at: string;
  description: string;
  image: string;
  title: string;
  name: string;
  product_count: number;
  slug: number;
  slug_en: number;
}
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
  file: string;
}

export interface CareerCategory {
  id: number;
  name: string;
}

export interface Career {
  id: number;
  title: string;
  description: string;
  job_type: string;
  long_description: string;
  responsibilities: string;
  category: CareerCategory;
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    x: string;
  };
}

export interface CareerResponse {
  status: boolean;
  message: string;
  data: {
    career: Career;
    contact: any;
  };
}
export interface ProductResponse {
  data: {
    product: Product;
    related_products: Product[];
  };
}
export interface IClientReviews {
  id: string | undefined;
  image: string;
  job: string;
  name: string;
  review: string | number | undefined;
}
export interface Certificates {
  id: string;
  description: string;
  image: string;
  name: string;
}
export interface Blogs {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  date: string;
  image: string;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface BlogsData {
  data: Blogs[];
  links: Links;
  meta: Meta;
}

export interface IBlogsPage {
  status: boolean;
  message: string;
  data: {
    blogs: BlogsData;
    title: string;
    description: string;
  };
}
export interface ICareerPage {
  data: {
    careers: {
      data: ICareer;
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
      meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: {
          url: string | null;
          label: string;
          active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
      };
    };
    title: string;
    description: string;
  };
}

export interface ICareer {
  id: number;
  title: string;
  description: string;
  job_type: string;
  long_description: string;
  responsibilities: string;
  created_at: string;
  category: {
    id: number;
    name: string;
  };
}

export interface IProducts {
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
export interface IPartners {
  id: string;
  logo: string;
  name: string;
}
export interface CategoriesAndBrands {
  status: boolean;
  message: string;
  data: {
    categories: Category[];
    brands: Brand[];
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  slug_en: string;
  product_count: number;
  image: string;
  description: string;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
}
export interface IHomePage {
  pageData: {
    data: {
      clientReviews: IClientReviews[];
      services: IServices[];
      categories: ICategories[];
      certificates: Certificates[];
      blogs: Blogs[];
      products: Product[];
      newestProducts: Product[];
      partners: IPartners[];
      landing: {
        card_section: any;
        contact_section: any;
        eighth_section: any;
        fifth_section: IFifth_Section;
        first_section: IFirst_section;
        footer_section: any;
        fourth_section: IFourth_section;
        hero_section: any;
        ninth_section: INinth_section;
        second_section: any;
        seventh_section: ISecond_section;
        sixth_section: any;
        tenth_section: ITenth_Section;
        third_section: IThird_section;
      };
    };
  };
}
export interface IHero {
  data: {
    button_text_1: string;
    button_text_2: string;
    description: string;
    images: string[];
    small_description_1: string;
    small_description_2: string;
    small_description_3: string;
    small_description_number_1: string;
    small_description_number_2: string;
    small_description_number_3: string;
    sub_title: string;
    title: string;
  };
}
export interface IVedio {
  src: string;
  title?: string;
}
export interface IServices {
  id: string | undefined;
  created_at: string;
  description: string;
  image: string;
  title: string;
}

export interface Services_Links {
  first: string | number | undefined | null;
  last: string | number | undefined | null;
  next: string | number | undefined | null;
  prev: string | number | undefined | null;
}
export interface IMeta_Services {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface MainServices {
  services: {
    data: IServices[];
    links: Services_Links[];
    meta: IMeta_Services[];
  };
}
export interface IContact {
  address: string;
  description: string;
  email: string;
  phone: string;
  title: string;
}
export interface IServicesPage {
  data: {
    contact: IContact;
    services: {
      data: IServices[];
      links: Services_Links[];
      meta: IMeta_Services[];
      title: string;
      button_text: string;
    };
  };
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface IContactUsPage {
  data: {
    header: {
      title?: string;
      description?: string;
      help?: {
        title?: string;
        number?: string;
      };
      media?: {
        title?: string;
        email?: string;
      };
      sales?: {
        title?: string;
        email?: string;
      };
    };
    contact: {
      title: string;
      description: string;
      email: string;
      phone: string;
      address: string;
      whatsapp: string;
      linkedin: string;
      instagram: string;
      facebook: string;
      x: string;
    };
    faqs: {
      title: string;
      description: string;
      button: string;
    };
    faqs_data: any[];
  };
}
export interface ITermsAndConditionsPage {
  data: {
    page: {
      type: string;
      title: string;
      content: string;
    };
  };
}
export interface IPrivacyAndPolicyPage {
  data: {
    page: {
      type: string;
      title: string;
      content: string;
    };
  };
}
