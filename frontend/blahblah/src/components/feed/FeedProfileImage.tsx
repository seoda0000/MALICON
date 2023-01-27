import Avatar from "@mui/material/Avatar";

const FeedProfileImage: React.FC<{
  src: string;
  // onRemoveTodo: () => void;
}> = (props) => {
  return (
    <Avatar
      alt="Sample"
      src={props.src}
      // sx={{ width: 56, height: 56 }}
    />
  );
};

export default FeedProfileImage;
