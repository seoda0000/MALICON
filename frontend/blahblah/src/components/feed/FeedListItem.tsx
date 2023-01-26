import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import FeedProfileImage from "./FeedProfileImage";
import CommentSection from "./CommentSection";
import parse from "html-react-parser";
import FeedSettingButton from "./FeedSettingButton";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FeedListItem: React.FC<{ item: any; onClickEditor: any }> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {/* <Card sx={{ maxWidth: 345 }}> */}
      <Card>
        <CardHeader
          avatar={<FeedProfileImage src={props.item.user.img} />}
          action={<FeedSettingButton onClickEditor={props.onClickEditor} />}
          title={props.item.user.username}
          subheader={props.item.created_at}
        />

        <CardContent>
          <Typography variant="h5">{props.item.title}</Typography>
          <div>{parse(props.item.content)}</div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>덧글 목록 추후 추가</Typography>
            <CommentSection />
          </CardContent>
        </Collapse>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default FeedListItem;
