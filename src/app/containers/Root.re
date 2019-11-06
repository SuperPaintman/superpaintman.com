open Locals;

let component = ReasonReact.statelessComponent("Root");

let make = (~locals as {email, links, content: {title, description}, footer: {license, repo}}, _children) => {
  ...component,
  render: _self =>
    <div className="container">
      <div className="content">
        <div className="profile">
          <div className="avatar-container"> <Avatar /> </div>
          <h1 className="name">
            {ReasonReact.string(title)}
          </h1>
          <h2 className="subtitle">
            {ReasonReact.string(description)}
          </h2>
        </div>
        <div className="line" />
        <CardList email links />
      </div>
      <Footer license repo />
    </div>,
};
