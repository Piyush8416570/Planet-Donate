import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'layouts/dashboard/layout';
import { OverviewBudget } from 'sections/overview/overview-budget';
import { OverviewLatestOrders } from 'sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'sections/overview/overview-latest-products';
import { OverviewSales } from 'sections/overview/overview-sales';
import { OverviewTasksProgress } from 'sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'sections/overview/overview-total-profit';
import { OverviewTraffic } from 'sections/overview/overview-traffic';
import Image from 'next/image';
const now = new Date();

const Page = () => (
  <>
<header className="header">
  {/*=============== Home ===============*/}
  <div className="home">
    <div className="row container">
      <div className="col">
        <h1 style={{fontSize:"3rem"}}>
          We're at halftime  <br />
          for the global<br />
          goals but we're not halfway there! <br />
        </h1>
        <p>
        </p>
        <a href className="btn">Management System</a>
      </div>
      <div className="col">
      <Image
        src="/assets/images/yty.png"
        alt="A beautiful image"
        width={400}
        height={300}
      />
        {/* <img src="./Images2/yty.png" alt="goals" /> */}
      </div>
    </div>
  </div>
</header>




{/*=============== Services ===============*/}
<section className="section services" id="services">
  <div className="row container">
    <div className="col">
      <h2>Why we are the best ?</h2>
      <p>
        we give the real time data and facilities available 
        at the current situation all over India.
      </p>
    </div>
    <div className="col">
      <div className="card">
      <Image
        src="/assets/images/cash1.png"
        alt="A beautiful image"
        width={100}
        height={100}
      />
        {/* <img src="./Images2/cash1.png" alt="cash" /> */}
        <h3>
          <br />
          Donation <br />
          goes to needed
          <br />
        </h3>
      </div>
    </div>
    <div className="col">
      <div className="card">
      <Image
        src="/assets/images/tracking.png"
        alt="A beautiful image"
        width={100}
        height={100}
      />
        {/* <img src="./Images2/tracking.png" alt="tracking map" /> */}
        <h3>
          <br />
          Realtime  <br />
          tracking  <br />
        </h3>
      </div>
    </div>
    <div className="col">
      <div className="card">
      <Image
        src="/assets/images/phone-icon.svg"
        alt="A beautiful image"
        width={100}
        height={100}
      />
        {/* <img src="./images/phone-icon.svg" alt="phone icon" /> */}
        <h3>
          We have <br />
          10+ NGOs <br />
          working with us
        </h3>
      </div>
    </div>
  </div>
</section>




  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
