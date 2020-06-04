import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Container, FormGroup, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import jsCookie from 'js-cookie';

import { days, months, years } from './RegisterPage';

export default function ProfilePage() {
    const [ username, setUsername ] = useState('');
    const [ firstname, setFirstname] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ newPassword, setConfirmPassword ] = useState('');
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
        fetchProfileData()
    }, [])

    useEffect(() => {

    }, [error, success]);

    const fetchProfileData = async() => {
        await Axios.get('http://localhost:5000/api/v1.0/users/profile', {
            headers: {
                Authorization: `Bearer ${jsCookie.get('authToken')}`
            }
        }).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const changePassword = async() => {
        const body = {
            user: {
                password: password, 
                newPassword: newPassword
            }
        }
        const config = {
            headers: {
                Authorization: `Bearer ${jsCookie.get('authToken')}`
            }
        }
        await Axios.put('http://localhost:5000/api/v1.0/users/changePassword', body, config)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const changeProfileData = async() => {
        let _day, _month;
        (day >= 1 && day < 10) ? _day = `0${day}` : _day = day;
        (month >= 1 && month < 10) ? _month = `0${month}` : _month = month;
        const newDate = `${_day}/${_month}/${year}`;
        const body = {
            user: {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber: phonenumber,
                address: address,
                personalId: personalId,
                dob: newDate
            }
        }
        const config = {
            headers: {
                Authorization: `Bearer ${jsCookie.get('authToken')}`
            }
        }
        await Axios.put('http://localhost:5000/api/v1.0/users/editProfile', body, config)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
        <Header/>
        <main>
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
            </FormGroup>
            {
                error ? <Typography variant="body2">Something went wrong</Typography> : ''
            }
            {
                success ? <Typography variant="body1">Successful registed. You will be redirected . . .</Typography>: ''
            }
            </Container>
        </main>
        <Footer/>
        </>
    )
}
