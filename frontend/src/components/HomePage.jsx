import "../styles/HomePage.css";
import Avatar from "@mui/joy/Avatar";
function Homepage() {
  return (
    <div>
      <header className="appHeader">
        <h1 className="nameOfSite" style={{ marginLeft: "20px" }}>
          Learnify
        </h1>
        <Avatar />

        <div className="headerRightPart" style={{ marginRight: 40 }}></div>
      </header>
    </div>
  );
}

export default Homepage;
