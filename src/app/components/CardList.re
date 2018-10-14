open Locals;

let component = ReasonReact.statelessComponent("CardList");

let make = (~email: string, ~links: array(localsLink), _children) => {
  ...component,
  render: _self =>
    <div className="card-list">
      {
        links
        ->Array.map(
            ({id, url, title, name}) =>
              <CardItem key=id id url title username=name />,
            _,
          )
        ->ReasonReact.array
      }
      <CardEmail email />
    </div>,
};
