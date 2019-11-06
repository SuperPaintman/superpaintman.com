[@bs.deriving jsConverter]
type localsLink = {
  id: string,
  title: string,
  name: string,
  url: string,
};

[@bs.deriving jsConverter]
type localsFooterRepo = {
  name: string,
  url: string,
};

[@bs.deriving jsConverter]
type localsFooterLicense = {
  text: string,
  url: string,
};

[@bs.deriving jsConverter]
type localsFooter = {
  repo: localsFooterRepo,
  license: localsFooterLicense,
};

[@bs.deriving jsConverter]
type localsContent = {
  title: string,
  description: string,
};

[@bs.deriving jsConverter]
type locals = {
  title: string,
  email: string,
  seo: unit, /* TODO */
  content: localsContent,
  links: array(localsLink),
  counters: unit, /* TODO */
  footer: localsFooter,
};

let convertLocals = locals => {
  /* TODO */
  let locals' = localsFromJs(locals);
  let localsContent': localsContent = [%bs.raw
    "localsContentFromJs(locals.content)"
  ];
  let localsLinks': array(localsLink) = [%bs.raw
    "locals.links.map(localsLinkFromJs)"
  ];
  /* let localsFooter': localsFooter = [%bs.raw "localsFooterFromJs(locals.footer)"]; */
  let localsFooterRepo': localsFooterRepo = [%bs.raw
    "localsFooterRepoFromJs(locals.footer.repo)"
  ];
  let localsFooterLicense': localsFooterLicense = [%bs.raw
    "localsFooterLicenseFromJs(locals.footer.license)"
  ];

  {
    ...locals',
    content: localsContent',
    links: localsLinks',
    footer:
      /* ...localsFooter', */
      {
        repo: localsFooterRepo',
        license: localsFooterLicense',
      },
  };
};
