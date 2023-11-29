import { Layout as DashboardLayout } from 'layouts/dashboard/layout';
import React, { useState, useEffect } from "react";
import { Typography, Container } from '@mui/material';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
export default function SignInSide() {
    const [selectedGoal, setSelectedGoal] = useState("No Poverty");
    const [isLoaded, setLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        setLoaded(true);

        if (isLoaded) {
            const stripe = Stripe('pk_test_...');
            const elements = stripe.elements();
            const card = elements.create('card');
            card.mount('#card-element');
        }
    }, [isLoaded]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    const submitHandler = async ({ donationAmount }) => {
        try {
            const { data } = await axios.put('/api/donation', {
                selectedGoal, donationAmount, email: JSON.parse(window.sessionStorage.getItem('userInfo'))?.email
            });
            console.log(data)
            setOpen(true);
        } catch (err) {

        }
        // router.push(redirect || '/account');
    };


    return (
        <DashboardLayout>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Donated Sucessfully!!"
            />
            <form onSubmit={handleSubmit(submitHandler)} >
                <Container maxWidth="xl">
                    <Typography variant="h4">
                        Donation
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        style={{ marginTop: "3rem" }}
                    >
                        <FormControl style={{ width: "50%" }} variant="outlined">
                            <InputLabel>Select Development Goal You Want to Support</InputLabel>
                            <Select
                                value={selectedGoal}
                                onChange={(event) => setSelectedGoal(event.target.value)}
                                label="Select Sustainable Development Goal"
                            >
                                <MenuItem value="No Poverty">No Poverty</MenuItem>
                                <MenuItem value="Zero Hunger">Zero Hunger</MenuItem>
                                <MenuItem value="Good Health & Well Being">Good Health & Well Being</MenuItem>
                                <MenuItem value="Quality Education">Quality Education</MenuItem>
                                <MenuItem value="Gender Equality">Gender Equality</MenuItem>
                                <MenuItem value="Clean Water & Sanitation">Clean Water & Sanitation</MenuItem>
                                <MenuItem value="Affordable & Clean Energy">Affordable & Clean Energy</MenuItem>
                                <MenuItem value="Decent Work & Economic Growth">Decent Work & Economic Growth</MenuItem>
                                <MenuItem value="Reduced Inequalities">Reduced Inequalities</MenuItem>
                                <MenuItem value="Climate Action">Climate Action</MenuItem>
                                <MenuItem value="Life Before Water">Life Before Water</MenuItem>
                                <MenuItem value="Life on Land">Life on Land</MenuItem>

                            </Select>
                        </FormControl>

                        <Controller

                            name="donationAmount"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    style={{ width: "50%" }}
                                    sx={{ my: 1 }}

                                    variant="outlined"
                                    fullWidth
                                    id="donationAmount"
                                    label="Donation Amount "
                                    inputProps={{ type: 'number' }}
                                    error={Boolean(errors.donationAmount)}
                                    helperText={
                                        errors.donationAmount ? 'Donation Amount is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </Stack>

                    <div style={{ width: '50%', marginTop: "2rem", marginBottom: "2rem" }} id="payment-form" action>
                        <div className="form-row">
                            <label htmlFor="card-element">
                                <h3 id="paym">Credit and Debit Card for Payment</h3>
                            </label>
                            <div id="card-element"></div>
                            <div id="card-errors" role="alert"></div>
                            <button type="submit" id="payment-form-submit">Pay</button>
                        </div>
                    </div>
                </Container>
            </form>
        </DashboardLayout>
    );
}
