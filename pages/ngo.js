import Head from 'next/head';
import React, { useState, useEffect, useContext } from "react";
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'layouts/dashboard/layout';
import { CompanyCard } from 'sections/companies/company-card';
import { CompaniesSearch } from 'sections/companies/companies-search';
import { useRouter } from "next/router";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Ngos() {
  const [selectedGoal, setSelectedGoal] = useState("");

  const [ngos, setNgos] = React.useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get(`/api/get-ngo`);
      console.log(data)
      setNgos(data)
    }
    fetch();
  }, [router]);

  return (
    <DashboardLayout>
      <Head>
        <title>
          NGO's | Planet Donate
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  NGO's
                </Typography>

              </Stack>

              <div>
                <Button
                onClick={()=>{ router.push('/add-ngo');}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>

            {/* <CompaniesSearch /> */}
            <FormControl variant="outlined">
              <InputLabel>Select Development Goal You Want to Support</InputLabel>
              <Select
                value={selectedGoal}
                onChange={(event) => setSelectedGoal(event.target.value)}
                label="Select Sustainable Development Goal"
              >
                <MenuItem value="">All Goals</MenuItem>
                {Array.from(
                  new Set(
                    ngos.flatMap((ngo) => ngo.sustainableDevelopmentGoals)
                  )
                ).map((goal) => (
                  <MenuItem key={goal} value={goal}>
                    {goal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid
              container
              spacing={3}
            >
              {/* {ngos.map((ngo) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={ngo._id}
                >
                  <CompanyCard company={ngo} />
                </Grid>
              ))} */}

              {ngos
                .filter((ngo) =>
                  selectedGoal ? ngo.sustainableDevelopmentGoals.includes(selectedGoal) : true
                )
                .map((ngo) => (
                  <Grid xs={12} md={6} lg={4} key={ngo._id}>
                    <CompanyCard company={ngo} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
}


