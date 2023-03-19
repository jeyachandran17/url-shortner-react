import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';


const formValidationSchema = yup.object({
  email : yup.string().required().email(),
})

export function ForgetPassword() {
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      console.log("Update password successfully", values);
    }
})
  return (
    <form>
      <Card className='forget-password'>
        <CardContent>
          <h3>Forget password</h3>
          <div className='forget-password-textfiled'>
            <TextField id="outlined-basic" error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : null } value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} label="Enter email" variant="outlined" />
          </div>
          <div className='forget-password-button'>
            <Button variant='contained' sx={{ marginLeft: "auto" }} color='primary' type='submit' onClick={()=>navigate("/otp-page")}>Ok</Button>
            <Button variant='contained' color='error' onClick={()=>navigate('/login')}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}