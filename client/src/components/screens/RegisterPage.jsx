import React from 'react'
import { Container, FormGroup, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core'
import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import jsCookie from 'js-cookie';

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

const days = range(1, 31);
const months = range(1, 12);
const years = range(1970,  2020);

export default function RegisterPage({
    setAppState
}) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude);
        })
    }
    const history = useHistory();

    const [ lat, setLat ] = useState(0);
    const [ lng, setLng ] = useState(0);

    const [ username, setUsername ] = useState('');
    const [ firstname, setFirstname] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ day, setDay ] = useState(1);
    const [ month, setMonth ] = useState(1);
    const [ year, setYear ] = useState(2020);
    const [ gender, setGender ] = useState('');
    const [ personalId, setPersonalId ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ phonenumber, setPhoneNumber ] = useState(null);

    const [ error, setError ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {

    }, [error, success]);

    const registerUser = async() => {
        if (password === confirmPassword && password.length > 8) {
            const DOB = `${day}/${month}${year}`;
            const body = {
                user: {
                    username,
                    password,
                    firstname,
                    lastname,
                    gender,
                    dob: DOB,
                    personalId,
                    email,
                    address,
                    phonenumber,
                    latitude: lat,
                    longitude: lng,
                    role: "User"
                }
            }

            await Axios.post(`http://localhost:5000/api/v1.0/users/create`, body)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    // redirect and store token as cookie
                    jsCookie.set('authToken', res.data.token);
                    setSuccess(true);
                    setError(false);
                    setAppState(1);
                    setTimeout(() => history.push('/'), 1500);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true);
                setSuccess(false);
            });
        }
        
    }

    return (
        <>
        <Container>
            <FormGroup>
                <TextField
                    label="Username *"
                    variant="outlined"
                    onChange={e => setUsername(e.target.value)}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Firstname *"
                            fullWidth
                            variant="outlined"
                            onChange={e => setFirstname(e.target.value)}
                        />    
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Lastname *"
                            variant="outlined"
                            fullWidth
                            onChange={e => setLastname(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <TextField
                    label="Email *"
                    type="email"
                    variant="outlined"
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label="Password *"
                    type="password"
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)}
                />
                <TextField
                    label="Confirm password *"
                    type="password"
                    variant="outlined"
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <FormControl>
                    <InputLabel>Gender *</InputLabel>
                    <Select
                        value={gender}
                        variant="outlined"
                        onChange={e => setGender(e.target.value)}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Misc">Not listed</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Birthday *</InputLabel>
                    <Select
                        value={day}
                        variant="outlined"
                        onChange={e => setDay(e.target.value)}
                    >
                        {
                            days.map(i => <MenuItem key={`day-${i}`} value={i}>{i}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Birthmonth *</InputLabel>
                    <Select value={month} variant="outlined" onChange={e => setMonth(e.target.value)}>
                        {
                            months.map(i => <MenuItem key={`month-${i}`} value={i}>{i}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Birthyear *</InputLabel>
                    <Select value={year} variant="outlined" onChange={e => setYear(e.target.value)}>
                        {
                            years.map(i => <MenuItem key={`year-${i}`} value={i}>{i}</MenuItem>)
                        }
                    </Select> 
                </FormControl>
                <TextField
                    label="Personal ID *"
                    variant="outlined"
                    onChange={e => setPersonalId(e.target.value)}
                />
                <TextField
                    label="Address"
                    variant="outlined"
                    onChange={e => setAddress(e.target.value)}
                />
                <TextField
                    label="Phonenumber"
                    variant="outlined"
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={registerUser}
                >
                    Register
                </Button>
            </FormGroup>
            {
                error ? <Typography variant="body2">Something went wrong</Typography> : ''
            }
            {
                success ? <Typography variant="body1">Successful registed. You will be redirected . . .</Typography>: ''
            }
        </Container>
        </>
    )
}
