const BroadcastListItem: React.FC<{ session: any }> = (props) => {
  return <div>세션 아이디 : {props.session.sessionId}</div>;
};

export default BroadcastListItem;
