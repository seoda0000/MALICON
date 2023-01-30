import SelectItem from "./SelectItem";
import { Stack } from "@mui/system";

const SelectList: React.FC<{ options: any; bodyNextHandler: any }> = (
  props
) => {
  return (
    <Stack direction="column" spacing={1} justifyContent="center">
      {Object.keys(props.options).map((option) => (
        <SelectItem option={option} bodyNextHandler={props.bodyNextHandler} />
      ))}
    </Stack>
  );
};
export default SelectList;
