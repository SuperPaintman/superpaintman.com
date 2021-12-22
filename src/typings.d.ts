declare type Link = {
  id: string;
  title: string;
  name: string;
  url: string;
};

declare type Locals = {
  title: string;
  email: string;
  seo: {
    robots: {
      index: boolean;
      follow: boolean;
    };
    title: string;
    description: string;
    keywords: string[];
    local: string;
    type: string;
    url: string;
    site_name: string;
    canonical: string;
    theme_color: string;
    twitter: {
      card: string;
      site: string;
    };
  };
  content: {
    title: string;
    description: string;
  };
  links: Link[];
  counters: {
    yandex: number;
    google: string;
  };
  footer: {
    repo: {
      name: string;
      url: string;
    };
    license: {
      text: string;
      url: string;
    };
  };
};

declare const LOCALS: Locals;

declare type ResponsiveLoader = {
  srcSet: string;
  images: ResponsiveLoaderImage[];
  src: string;
  width: number;
  height: number;
};

declare type ResponsiveLoaderImage = {
  path: string;
  width: number;
  height: number;
};

declare const IS_SSR: boolean;
