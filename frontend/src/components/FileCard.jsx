import { react } from "react";
import { Link } from "react-router-dom";
function FileCard({ file }) {
  return (
    <Link to={"/files" + file.fileID}>
      <div className="kudos-card">
        <img src={imgURL} alt="there is an image here" className="imageTag" />
        <div className="boardDetails">
          <h5 style={{ margin: "4px" }}>{board.title}</h5>
        </div>

        <div className="bottomButtons">
          <button
            style={{ backgroundColor: "blue" }}
            className="deleteBoard"
            onClick={deleteClicked}
          >
            Delete Board
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FileCard;
