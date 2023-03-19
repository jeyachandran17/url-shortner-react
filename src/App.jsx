import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const formValidationSchema = yup.object({
  url : yup.string().required().min(6).url(),
})


function App() {
  const [count, setCount] = useState(0)
    const navigate = useNavigate();

  const [show, setshow] = useState(true);

  const darkTheme = createTheme({
  palette: {
    mode: show ? 'dark' : 'light',
  },
  });

    const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle} >
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={()=>navigate("/")} >Home</Button>
              <IconButton sx={{marginLeft:"auto"}} color="inherit" onClick={() => setshow(!show)} >{show ? <BrightnessHighIcon/> : <Brightness4Icon/> }</IconButton>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/urls" element={<UrlsPage />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App

function UrlDashboarad() {
  const navigate = useNavigate();
  
  const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema : formValidationSchema,
    onSubmit : (newurl) => {
      console.log("Form values",values);
      addurl(newurl);
    }
  });
  const addurl = async (newurl) => {

    
   await fetch("http://localhost:4000/url", {
      method : "POST",
      body: JSON.stringify(newurl),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigate("/urls")
        console.log(newurl);
      }
  return (
    <form onSubmit={handleSubmit}>
      <div className='url-dashboard'>
        <TextField sx={{minWidth:"500px"}} type="text" error={errors.url && touched.url} helperText={errors.url && touched.url ? errors.url : null } value={values.url} name="url" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Enter or paste url" variant="outlined" />
        <Button variant="contained" type='submit'>Add url</Button>
      </div>
    </form>
  );
}

function UrlCard({data}) {
  
  return (
    <Card className='url-card'>
      <CardContent >
        <a href={data.url}>{data.shorturl}</a>
        <p>The longer url was converted to the short url ✨🥳 </p>
      </CardContent> 
    </Card>
  );
}



function UrlList() {
  
  const [urlList, seturlList] = useState([])
   
  useEffect(() => geturl(), [])

  const geturl = () => {
    fetch("http://localhost:4000/url", {
        method: "GET",
      })
        .then((data) => data.json())
          .then((data)=>seturlList(data))
  }

  return (
    <div className="url-card">
      {urlList.map((ele) => (<UrlCard data={ele} key={ ele._id } />))}
    </div>
  );
}

function UrlsPage() {
  return (
    <div>
      <div className="url-text-box">
        <h3 className='url-content'> This Page granted to long url convert to equal value of short url ( url-shortener ) </h3>
        <UrlDashboarad />
      </div>
      <div className="url-card-box">
        <UrlList />
      </div>
    </div>
  );
}