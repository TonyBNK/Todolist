import React from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {FormikErrorType} from "../../../types/types";
import {Redirect} from "react-router-dom";
import {authSelector} from "../../../redux/selectors";
import {useAppDispatch} from "../../../utils/redux-utils";
import {authActions} from "../../../redux/reducers";


export const Login = () => {
    const dispatch = useAppDispatch();
    const isLogged = useSelector(authSelector.selectIsLogged);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password === 'free') {
                return errors;
            } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/.test(values.password)) {
                errors.password = 'Invalid password';
            }

            return errors;
        },
        onSubmit: async (values, formikHelpers) => {
            const action = await dispatch(authActions.logIn(values));
            if (authActions.logIn.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    formikHelpers.setFieldError(
                        action.payload.fieldsErrors[0].field,
                        action.payload.fieldsErrors[0].error
                    );
                }
            }
        },
    });

    const errorStyle = {
        borderBottom: '2px solid red',
        outlined: false
    }

    const [emailError, passwordError] = [
        formik.touched.email && formik.errors.email,
        formik.touched.password && formik.errors.password
    ];

    if (isLogged) {
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
                                style={emailError ? errorStyle : {}}
                            />
                            {
                                emailError
                                    ? <div
                                        style={{color: 'red'}}>{formik.errors.email}</div>
                                    : null
                            }
                            <TextField
                                type={'password'}
                                label={'Password'}
                                margin={'normal'}
                                {...formik.getFieldProps('password')}
                                style={passwordError ? errorStyle : {}}
                            />
                            {
                                passwordError
                                    ? <div
                                        style={{color: 'red'}}>{formik.errors.password}</div>
                                    : null
                            }
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                                label={'Remember me'}
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
