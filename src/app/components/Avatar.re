let size = "152";
let src: string = [%bs.raw
  {|
  require(`images/avatar.jpg?{
    sizes: [304, 152]
  }`).src
|}
];
let alt = "Aleksandr Krivoshchekov\'s (SuperPaintman) Avatar";

let component = ReasonReact.statelessComponent("Avatar");

let make = _children => {
  ...component,
  render: _self =>
    <div
      className="avatar"
      style={
        ReactDOMRe.Style.make(~width=size ++ "px", ~height=size ++ "px", ())
      }>
      <img className="image" width=size height=size src alt />
    </div>,
};
