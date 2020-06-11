import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Loading from './Loading';
import setting from './Utils.json';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp(props) {
	
    const classes = useStyles()
    const input = useRef()

    const [ifError, setError] = useState(false);
    const [errorMes, setErrorMes] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = () => {

        setLoading(true)
        const title = input.current.value
        if (title === "") {
            setError(true)
            setErrorMes("Must have an event title!")
            return false
        } 

        var config = { headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'}
        }
        
        const data = new FormData();
        data.append('eventTitle', title); 
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/create", data, config, { timeout: 3 })
        .then(function (response) {
            props.handleClick("Teacher")
            props.handleEventTitle(title)
            props.handleEventCode(response.data['event_code'])
            props.handleEventToken(response.data['event_token'])
        })
        .catch(function (error) {
            setError(true)
            setLoading(false)
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
                    Sign up
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={ifError}
                                variant="outlined"
                                required
                                fullWidth
                                name="eventtitle"
                                label="Event Title"
                                id="eventtitle"
                                autoComplete="eventtitle"
                                autoFocus
                                helperText={errorMes}
                                inputRef={input}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I have read and accept the terms and conditions and the privacy policy."
                            />
                        </Grid>
                    </Grid>
                    {isLoading ? <Loading /> :  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => handleSubmit()}
                    >
                        Sign Up
                    </Button>}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <a href="/#" onClick={() => props.handleClick("Sign In")}>
                                    {"Already have a token? Click to Sign in"}
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    )
}
