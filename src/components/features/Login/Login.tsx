import React from "react";
import {
    Button,
    Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../../bll/thunks/thunks";
import {RootStateType} from "../../../types/types";
import {Redirect} from "react-router-dom";


export const Login = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector<RootStateType, boolean>(
        state => state.auth.isLogged
    );

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            if (!values.email) {
                return{
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return{
                    password: 'Password is required'
                }
            }
        },
        onSubmit: values => {
            dispatch(logIn(values));
        },
    });

    if (isLogged){
        return <Redirect to={'/'}/>
    }

    return (
        <Grid container justify={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}
                      style={{display: 'flex', justifyContent: 'center'}}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered <a
                                href="https://social-network.samuraijs.com/"
                                target={'_blank'}
                                rel="noreferrer">here</a>
                            </p>
                            <p>
                                or use common test account credentials:
                            </p>
                            <p>
                                Email: free@samuraijs.com
                            </p>
                            <p>
                                Password: free
                            </p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label={'Email'}
                                margin={'normal'}
                                {...formik.getFieldProps('email')}
                            />
                            {
                                formik.touched.email && formik.errors.email
                                    ? <div>{formik.errors.email}</div>
                                    : null
                            }
                            <TextField
                                type={'password'}
                                label={'Password'}
                                margin={'normal'}
                                {...formik.getFieldProps('password')}
                            />
                            {
                                formik.touched.password && formik.errors.password
                                    ? <div>{formik.errors.password}</div>
                                    : null
                            }
                            <FormControlLabel
                                control={<Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    checked={formik.values.rememberMe}
                                />}
                                label={'RememberMe'}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}