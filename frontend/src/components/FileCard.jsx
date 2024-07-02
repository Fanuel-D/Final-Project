import { react } from "react";
import { Link } from "react-router-dom";
import "../styles/FileCard.css";
function FileCard({ userFile }) {
  return (
    <Link to={"/files/" + userFile.fileId}>
      <div className="fileCard">
        <img src="" alt="img" className="imageTag" style={{ margin: "5px" }} />
        <div className="fileDetails">
          <h3 style={{ margin: "4px" }}>{userFile.fileName}</h3>
        </div>

        <div className="bottomButtons">
          <button
            style={{ backgroundColor: "grey" }}
            className="deleteFile"
            // onClick={deleteClicked}
          >
            Delete File
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FileCard;
