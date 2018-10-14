let component = ReasonReact.statelessComponent("CardItem");

let make = (~id, ~url, ~title, ~username, _children) => {
  ...component,
  render: _self =>
    <div className="card-item">
      <link rel="prefetch" href=url />
      <a className={j|card-content _clearfix -$id|j} title=username href=url>
        <div className="icon" />
        <div className="title"> {ReasonReact.string(title)} </div>
      </a>
    </div>,
};
