import PasswordInput from "./PasswordInput/PasswordInput";
import TextInput from "./TextInput/TextInput";

interface RTInputType {
  Text: typeof TextInput;
  Password: typeof PasswordInput;
}

const RTInput: RTInputType = {
  Text: TextInput,
  Password: PasswordInput,
};

export default RTInput;
