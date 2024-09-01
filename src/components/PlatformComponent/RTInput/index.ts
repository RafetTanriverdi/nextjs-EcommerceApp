import TextInput from "./TextInput/TextInput";

interface RTInputType {
  Text: typeof TextInput;
}

const RTInput: RTInputType = {
  Text: TextInput,
};

export default RTInput;
