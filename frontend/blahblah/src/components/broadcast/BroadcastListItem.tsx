import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/configStore";
import { broadcastActions } from "../../redux/modules/broadcast/broadcast-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
const BroadcastListItem: React.FC<{ session: any }> = (props) => {
  // 방송 진입
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const broadcast = useSelector((state: RootState) => state.broadcast);

  const joinSessionStart = async () => {
    console.log(props.session.sessionId);
    dispatch(
      broadcastActions.joinSession({ sessionId: props.session.sessionId })
    );
    console.log("여기요!!!!!!!!!!!", broadcast.currentSession.sessionId);
  };

  const onClickHandler = () => {
    // 리덕스에 저장하기 전에 호출되어서 프롭스에 안담겼음
    // await broadcastActions.joinSession({ sessionId: props.session.sessionId });
    joinSessionStart().then(() => {
      console.log("gggggggggggggggggggg", broadcast.currentSession.sessionId);
      navigate("/video");
    });
  };

  return (
    <div onClick={onClickHandler}>세션 아이디 : {props.session.sessionId}</div>
  );
};

export default BroadcastListItem;
