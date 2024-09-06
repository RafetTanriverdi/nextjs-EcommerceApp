import ActionButton from "./ActionButton/ActionButton";
import IconButton from "./IconButton/IconButton";
import LinkButton from "./LinkButton/LinkButton";

interface RTButtonType {
  Action: typeof ActionButton;
  Link: typeof LinkButton;
  Icon: typeof IconButton;
}

const RTButton: RTButtonType = {
  Action: ActionButton,
  Link: LinkButton,
  Icon: IconButton,
};

export default RTButton;
