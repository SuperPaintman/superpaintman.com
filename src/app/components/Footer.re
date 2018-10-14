open Locals;
open Date;

let component = ReasonReact.statelessComponent("Footer");

let make = (~repo, ~license, _children) => {
  ...component,
  render: _self => {
    let yearsRange =
      switch (createDate()->getFullYear) {
      | 2017 => "2017"
      | currentYear => "2017-" ++ string_of_int(currentYear)
      };

    <footer className="footer">
      <div className="wrapper">
        <div className="copyright">
          {ReasonReact.string({j|© $yearsRange SuperPaintman|j})}
        </div>
        <div className="license">
          <span> {ReasonReact.string("Licensed under the ")} </span>
          <a title={license.text} href={license.url} target="_blank">
            {ReasonReact.string(license.text)}
          </a>
        </div>
        <div className="repo">
          <span>
            {ReasonReact.string("Found a bug? Fork this site on ")}
          </span>
          <a title={repo.name} href={repo.url} target="_blank">
            {ReasonReact.string(repo.name)}
          </a>
        </div>
      </div>
    </footer>;
  },
};
