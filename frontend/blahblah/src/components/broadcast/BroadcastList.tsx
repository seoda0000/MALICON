import { SessionType } from "../../model/broadcast/sessionType";
import BroadcastListItem from "./BroadcastListItem";
const BroadcastList: React.FC<{ sessions: SessionType[] }> = (props) => {
  return (
    <div>
      {props.sessions.map((session) => (
        <BroadcastListItem session={session} key={session.sessionId} />
      ))}
    </div>
  );
};

export default BroadcastList;
