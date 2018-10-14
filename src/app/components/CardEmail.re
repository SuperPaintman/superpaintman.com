open Utils;
open ProtectEmail;

let dangerousContent = (href, title) =>
  dangerousHtml(
    {j|
<a class="card-content _clearfix -email" title="$title" href="$href">
  <div class="icon"></div>
  <div class="title">
    <span class="full">$title</span>
    <span class="mobile">Email</span>
  </div>
</a>
|j},
  );

let component = ReasonReact.statelessComponent("CardEmail");

let make = (~email, _children) => {
  ...component,
  render: _self => {
    let protectedEmail = protectEmailAlways(email);
    let href = {j|mailto:$protectedEmail|j};

    <div
      className="card-item"
      dangerouslySetInnerHTML={dangerousContent(href, protectedEmail)}
    />;
  },
};
