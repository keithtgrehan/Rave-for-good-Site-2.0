import { Redirect, Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import UpcomingEvents from "@/pages/upcoming-events";
import RfgNova from "@/pages/rfg-nova";
import ParkCleanup from "@/pages/park-cleanup";
import ParkCleanupDe from "@/pages/park-cleanup-de";
import BerlinParkCleanup from "@/pages/berlin-park-cleanup";
import CrewRadio from "@/pages/crew-radio";
import Impact from "@/pages/impact";
import Partners from "@/pages/partners";
import PartnersDe from "@/pages/partners-de";
import Artists from "@/pages/artists";
import GetInvolved from "@/pages/get-involved";
import Contact from "@/pages/contact";
import Impressum from "@/pages/impressum";
import Datenschutz from "@/pages/datenschutz";
import Transparency from "@/pages/transparency";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about"><About /></Route>
      <Route path="/events/rfg-nova"><Redirect to="/upcoming-events/rfg-nova" replace /></Route>
      <Route path="/events"><Redirect to="/upcoming-events" replace /></Route>
      <Route path="/upcoming-events/rfg-nova" component={RfgNova} />
      <Route path="/upcoming-events">
        <UpcomingEvents />
      </Route>
      <Route path="/park-cleanup" component={ParkCleanup} />
      <Route path="/de/park-cleanup" component={ParkCleanupDe} />
      <Route path="/berlin-park-cleanup" component={BerlinParkCleanup} />
      <Route path="/crew-radio" component={CrewRadio} />
      <Route path="/impact"><Impact /></Route>
      <Route path="/partners" component={Partners} />
      <Route path="/de/partners" component={PartnersDe} />
      <Route path="/artists" component={Artists} />
      <Route path="/get-involved" component={GetInvolved} />
      <Route path="/contact" component={Contact} />
      <Route path="/impressum">
        <Impressum />
      </Route>
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/transparency" component={Transparency} />
      <Route path="/imprint"><Redirect to="/impressum" replace /></Route>
      <Route path="/privacy"><Redirect to="/datenschutz" replace /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
