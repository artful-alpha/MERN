/*eslint-disable*/
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/authSlice.js";
import Tags from "./components/Tags";
import Test from "./components/Test";

function App() {
  const disptach = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    disptach(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/tags/:id' element={<Tags />} />
          <Route path='/test/' element={<Test></Test>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
