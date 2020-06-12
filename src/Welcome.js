import React from 'react';
import logo from './logo.png';
//import EventCode from './EventCode';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));



export default function SignIn(props) {
	
    const classes = useStyles();
    
    const handleClick = () => {
        console.log('dsfdf')
        var config = { headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'}
        }
        const data = new FormData()
        data.append('nuclearBombPassword', "cnlab2020")
        axios.post(setting["url"] + ":" + setting["port"] + "/weshare/destroy", data, config)
        .then(function (response) {
            console.log(response.data['valid'])
        })
        .catch(function (error) {
            console.log("error")
        })
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
                <img src={logo} alt="logo" height="300px"></img>
                {/*<EventCode />*/}
                {/*<Button variant="danger" size="sm" onClick={() => handleClick()}>Don't Push</Button>*/}
                <div style={{height: "5vh"}}></div>
                <Grid ontainer justify="flex-end">
                    <Grid item>
                        <a href="/#" onClick={() => props.handleClick("Sign Up")}>
                                {"Instructor? Click me!"}
                        </a>
                    </Grid>
                </Grid>
			</div>
		</Container>
	);
}
