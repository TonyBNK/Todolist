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


type InitialValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors = {
                email: '',
                password: ''
            };

            if (!values.email) {
                errors.email = 'Email is required';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <Grid container justify={'center'}>
            <Grid item xs={4} justify={'center'}>
                <form>
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
                                control={<Checkbox/>}
                                label={'RememberMe'}
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
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