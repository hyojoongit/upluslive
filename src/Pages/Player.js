import { useHistory, useParams } from "react-router-dom";

function Player(props) {
  let { id } = useParams();
  let match = props.programs.find(function (a) {
    return a.id == id;
  });

  return (
    <div>
      <h1>{match.title}</h1>
    </div>
  );
}

export default Player;
