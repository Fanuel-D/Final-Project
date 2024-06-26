import "../styles/HomePage.css";
import Avatar from "@mui/joy/Avatar";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Homepage() {
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "150px",
          padding: "20px 50px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            Learnify
          </Typography>
        </div>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Avatar className="avatar" />
      </AppBar>
    </Box>
  );
}

export default Homepage;

{
  /* <header className="appHeader">
        <h1 className="nameOfSite" style={{ marginLeft: "10px" }}>
          Learnify
        </h1>
        <Avatar className="avatar" />
      </header>
      <body>
        <Box
          height={200}
          width={200}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          This Box uses MUI System props for quick customization.
        </Box>
      </body> */
}
