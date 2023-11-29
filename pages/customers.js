import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'hooks/use-selection';
import { Layout as DashboardLayout } from 'layouts/dashboard/layout';
import { CustomersTable } from 'sections/customer/customers-table';
import { CustomersSearch } from 'sections/customer/customers-search';
import { applyPagination } from 'utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'mumbai',
      state: 'Maharashtra',
      street: '284 mallad road'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'chiragNagar21@gmail.com',
    name: 'Chirag Nagar',
    phone: '8851248089'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'new delhi',
      state: 'delhi',
      street: 'plot-21 dwarka'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'siddharth.dhondiyal2512@gmail.com',
    name: 'Siddharth Dhondiyal',
    phone: '8851238089'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'New Delhi',
      state: 'delhi',
      street: 'st. 23 gurgaon'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'apoorva.verma@gmail,com',
    name: 'apoorva verma',
    phone: '3267425554'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'new delhi',
      state: 'delhi',
      street: '21 st lodhi garden'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'piyush212@gmail.com',
    name: 'piyush singh',
    phone: '9086913242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'new delhi',
      state: 'delhi',
      street: '752 st. chandni chawk'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'priya@gmail.com',
    name: 'priya sharma',
    phone: '9723334106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'gurgaon',
      state: 'haryana',
      street: '317 gurgaon Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'mayank23@gmail.com',
    name: 'mayank jalan',
    phone: '8586023409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'new delhi',
      state: 'delhi',
      street: '21 st. kailash puri'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'shubham2121@gmail.com',
    name: 'shubham kumar',
    phone: '4159072647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'mumbai',
      state: 'maharashtra',
      street: '179 rd. juhu beach'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'amankumar21@gmail.com',
    name: 'aman kumar',
    phone: '7026611654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'panji',
      state: 'goa',
      street: '39 st. sebastian garden'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'vijay.kumar21@gmail.com',
    name: 'vijay kumar',
    phone: '3138128947'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
        Contributors | Planet Donate
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
                Contributors
                </Typography>
             
              </Stack>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
