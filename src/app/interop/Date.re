type date;

[@bs.new] external createDate: unit => date = "Date";

[@bs.val] external currentTime: unit => int = "Date.now";

[@bs.send] external getFullYear: date => int = "";
