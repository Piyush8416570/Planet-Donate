import { Layout as DashboardLayout } from 'layouts/dashboard/layout';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataStore } from '../utils/DataStore';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';

export default function AddNGO() {
  const [noOfMembers, setNoOfMembers] = React.useState('');
  const [sustainableDevelopmentGoals, setSustainableDevelopmentGoals] = React.useState([]);
  const handleSustainableGoalChange = (goal) => {
    if (sustainableDevelopmentGoals.includes(goal)) {
      setSustainableDevelopmentGoals(sustainableDevelopmentGoals.filter(item => item !== goal));
    } else {
      setSustainableDevelopmentGoals([...sustainableDevelopmentGoals, goal]);
    }
  };
  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const submitHandler = async ({ name, city,targetDonation,collectedAmount,livesImpacted }) => {

    try {
      const { data } = await axios.post('/api/add-ngo', {
        name, city,targetDonation,collectedAmount,livesImpacted,noOfMembers,sustainableDevelopmentGoals
      });
      router.push(redirect || '/');
    } catch (err) {

    }
  };


  return (

    <DashboardLayout>
      {/* Form Started */}
      <form onSubmit={handleSubmit(submitHandler)} >
        <Box
          sx={{
            my: 8,
            mx: 4,
          }}
        >

          <Typography component="p" sx={{ fontWeight: 700 }} variant="h6">
            Add NGO
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" sx={{ mb: 2 }} spacing={2}>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="NGO Name"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name ? 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>


              {/* City */}
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city ? 'City is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Stack>


            <Stack direction="row" sx={{ mb: 2 }} spacing={2}>
              {/*'Target Donation */}
              <Controller
                name="targetDonation"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    variant="outlined"
                    fullWidth
                    id="targetDonation"
                    label="Target Donation (Anually)"
                    inputProps={{ type: 'number' }}
                    error={Boolean(errors.targetDonation)}
                    helperText={
                      errors.targetDonation ? 'Target Donation (Anually) is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>

              {/*'Collected Amount */}
              <Controller
                name="collectedAmount"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    variant="outlined"
                    fullWidth
                    id="collectedAmount"
                    label="Collected Amount"
                    inputProps={{ type: 'number' }}
                    error={Boolean(errors.collectedAmount)}
                    helperText={
                      errors.collectedAmount ? 'Collected Amount is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>

              {/* Lives Impacted */}
              <Controller
                name="livesImpacted"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ my: 1 }}
                    variant="outlined"
                    fullWidth
                    id="livesImpacted"
                    label="Lives Impacted"
                    inputProps={{ type: 'number' }}
                    error={Boolean(errors.livesImpacted)}
                    helperText={
                      errors.livesImpacted ? 'Lives Impacted is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Stack>


            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Number of Members</InputLabel>
              <Select
                sx={{ my: 1 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={noOfMembers}
                label="Number of Members"
                onChange={(e) => { setNoOfMembers(e.target.value);}}>
                <MenuItem value={"1-10"}>1-10</MenuItem>
                <MenuItem value={"10-50"}>10-50</MenuItem>
                <MenuItem value={"50-100"}>50-100</MenuItem>
                <MenuItem value={"100-1000"}>100-1000</MenuItem>
                <MenuItem value={"1000+"}>1000+</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 1 }}>
              <InputLabel id="sustainableDevelopmentGoals">Sustainable Development Goals</InputLabel>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("No Poverty")}
      onChange={() => handleSustainableGoalChange("No Poverty")}/>} label="No Poverty" />
                <FormControlLabel control={<Checkbox  checked={sustainableDevelopmentGoals.includes("Zero Hunger")}
      onChange={() => handleSustainableGoalChange("Zero Hunger")}/>} label="Zero Hunger" />
                <FormControlLabel control={<Checkbox  checked={sustainableDevelopmentGoals.includes("Good Health & Well Being")}
      onChange={() => handleSustainableGoalChange("Good Health & Well Being")}/>} label="Good Health & Well Being" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Quality Education")}
      onChange={() => handleSustainableGoalChange("Quality Education")} />} label="Quality Education" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Gender Equality")}
      onChange={() => handleSustainableGoalChange("Gender Equality")}/>} label="Gender Equality" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Clean Water & Sanitation")}
      onChange={() => handleSustainableGoalChange("Clean Water & Sanitation")}/>} label="Clean Water & Sanitation" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Affordable & Clean Energy")}
      onChange={() => handleSustainableGoalChange("Affordable & Clean Energy")}/>} label="Affordable & Clean Energy" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Decent Work & Economic Growth")}
      onChange={() => handleSustainableGoalChange("Decent Work & Economic Growth")}/>} label="Decent Work & Economic Growth" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Industry Innovation & Infrastructure")}
      onChange={() => handleSustainableGoalChange("Industry Innovation & Infrastructure")}/>} label="Industry Innovation & Infrastructure" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Reduced Inequalities")}
      onChange={() => handleSustainableGoalChange("Reduced Inequalities")}/>} label="Reduced Inequalities" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Sustainable Cities & Communities")}
      onChange={() => handleSustainableGoalChange("Sustainable Cities & Communities")}/>} label="Sustainable Cities & Communities" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Responsible Consumption & Production")}
      onChange={() => handleSustainableGoalChange("Responsible Consumption & Production")}/>} label="Responsible Consumption & Production" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Climate Action")}
      onChange={() => handleSustainableGoalChange("Climate Action")}/>} label="Climate Action" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Life Before Water")}
      onChange={() => handleSustainableGoalChange("Life Before Water")}/>} label="Life Before Water" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Life on Land")}
      onChange={() => handleSustainableGoalChange("Life on Land")}/>} label="Life on Land" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Peace, Justice & Strong Institutions")}
      onChange={() => handleSustainableGoalChange("Peace, Justice & Strong Institutions")}/>} label="Peace, Justice & Strong Institutions" />
                <FormControlLabel control={<Checkbox checked={sustainableDevelopmentGoals.includes("Partnerships for the Goals")}
      onChange={() => handleSustainableGoalChange("Partnerships for the Goals")}/>} label="Partnerships for the Goals" />
              </FormGroup>

            </Box>


            <Button className='hvr-grow' type="submit"
              style={{ width: '100%', backgroundColor: '#7E7EAF', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
              Add NGO
            </Button>


          </Box>
        </Box>
      </form>


    </DashboardLayout>
  );
}