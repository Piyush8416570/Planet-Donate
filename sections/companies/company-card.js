import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { CircularProgressbar } from 'react-circular-progressbar';
import Chip from '@mui/material/Chip';
export const CompanyCard = (props) => {
  const { company } = props;
  console.log()
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>

        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          <b>Target Donation (Anually): </b>{company.targetDonation}<br />
          <b>Amount Collected Till Now: </b>{company.collectedAmount}<br />
          <b>Lives Impacted: </b>{company.livesImpacted}<br />
        </Typography>
        <center>
          <div style={{ width: 70, marginTop: "2rem", marginBottom: "1rem" }}>
            <CircularProgressbar value={(company.collectedAmount / company.targetDonation).toFixed(2) * 100} text={`${(company.collectedAmount / company.targetDonation).toFixed(2) * 100}%`} />

          </div>
        </center>
        <Stack direction="column" spacing={1}>
          {company.sustainableDevelopmentGoals.map((item) => (
            <Chip label={item} variant="filled" />
          ))}
        </Stack>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <LocationOnIcon />
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.city}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <PeopleIcon />
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.noOfMembers}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
