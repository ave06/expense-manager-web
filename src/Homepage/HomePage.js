import AppBar from "../AapBar/AapBar";
import home from "./home.jpg";
import Footer from "../Footer/Footer";

const HomePage = () => {
  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=868&q=80')",
    height: "92vh",
    marginTop: "0px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

  };
  return (
    <div style={myStyle}>
      <AppBar></AppBar>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
