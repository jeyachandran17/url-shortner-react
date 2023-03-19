import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function NewPassword() {
  return (
    <Card className="new-password">
      <CardContent>
        <h3>Change new Password</h3><hr />
        <div className='new-password-content'>
          <TextField id="outlined-basic" label="new password" variant="outlined" />
          <TextField id="outlined-basic" label="confirm password" variant="outlined" />
          <p>Change your new password and the password must be minimun 6 characters</p>
        </div>
        <div className="otp-page-button">
          <Button variant='contained' sx={{ marginLeft: "auto" }} color='success' type='submit' onClick={() => navigate("/login")}>done</Button>
          <Button variant='contained' color='error' onClick={() => navigate('/login')}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
