import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn(props) {

    const classes = useStyles();
    const input = useRef() 
       
    const [ifError, setError] = useState(false);
    const [errorMes, setErrorMes] = useState('');
    
    const handleSubmit = () => {

        var config = { headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData();
        const token = input.current.value
        data.append('eventToken', token); 
        axios.post("http://140.112.30.32:48764/weshare/admin", data, config, { timeout: 3 })
        .then(function (response) {
            if (response.data['valid'] === "True") {
                props.handleClick("Teacher")
                props.handleEventTitle(response.data['event_title'])
                props.handleEventCode(response.data['event_code'])
                props.handleEventToken(token)
            }
            else {
                setError(true)
                setErrorMes("Token Incorrect!")
            }
        })
        .catch(function (error) {
            console.log(error)
            setError(true)
            setErrorMes("Connection Failed!")
        })
    }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<div className={classes.form} noValidate>
					<TextField
                        error={ifError}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="token"
						label="Token"
						id="token"
						autoComplete="token"
                        helperText={errorMes}
                        inputRef={input}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => handleSubmit()}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<a href="/#" onClick={() => props.handleClick("Sign Up")}>
									{"Don't have a token? Click to Sign Up"}
							</a>
						</Grid>
					</Grid>
				</div>
			</div>
		</Container>
	);
}
