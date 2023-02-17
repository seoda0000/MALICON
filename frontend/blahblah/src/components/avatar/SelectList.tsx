import SelectItem from "./SelectItem";
import { Stack } from "@mui/system";

const SelectList: React.FC<{ options: any; selectHandler: any }> = (props) => {
  return (
    <Stack direction="column" spacing={1} justifyContent="center">
      {Object.keys(props.options).map((option) => (
        <SelectItem
          option={option}
          selectHandler={props.selectHandler[String(option)]}
        />
      ))}
    </Stack>
  );
};
export default SelectList;
