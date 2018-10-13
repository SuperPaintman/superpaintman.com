declare interface ILocals {
  title: string;
  email: string;
  seo: {
    robots: {
      index:      boolean;
      follow:     boolean;
    };
    title:        string;
    description:  string;
    keywords:     string[];
    local:        string;
    type:         string;
    url:          string;
    site_name:    string;
    canonical:    string;
    theme_color:  string;
    twitter: {
      card:       string;
      site:       string;
    };
  };
  links: {
    [key: string]: {
      title: string;
      name:  string;
      url:   string;
    };
  };
  counters: {
    yandex:       number;
    google:       string;
  };
  footer: {
    repo: {
      name:       string;
      url:        string;
    };
    license: {
      text:       string;
      url:        string;
    };
  };
}

declare const IS_PRODUCTION: boolean;
declare const VERSION: string;
declare const LOCALS: ILocals;

declare interface IResponsiveLoader  {
  srcSet: string;
  images: IResponsiveLoaderImage[];
  src:    string;
  width:  number;
  height: number;
}

declare interface IResponsiveLoaderImage {
  path:   string;
  width:  number;
  height: number;
}
