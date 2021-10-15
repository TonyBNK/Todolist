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
import {useDispatch} from "react-redux";
import {login} from "../../../bll/thunks/thunks";


export const Login = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }

            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        onSubmit: values => {
            dispatch(login(values));
        },
    });

    return (
        <Grid container justify={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
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