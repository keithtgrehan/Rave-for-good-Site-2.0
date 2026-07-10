import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Events from "@/pages/events";
import UpcomingEvents from "@/pages/upcoming-events";
import RfgNova from "@/pages/rfg-nova";
import BerlinParkCleanup from "@/pages/berlin-park-cleanup";
import CrewRadio from "@/pages/crew-radio";
import Impact from "@/pages/impact";
import Partners from "@/pages/partners";
import Artists from "@/pages/artists";
import GetInvolved from "@/pages/get-involved";
import Contact from "@/pages/contact";
import Impressum from "@/pages/impressum";
import Datenschutz from "@/pages/datenschutz";

const queryClient = new QueryClient();

function ImpressumPage() {
  return <Impressum />;
}

function DatenschutzPage() {
  return <Datenschutz />;
}

function ImpressumAliasPage() {
  return <Impressum canonicalPath="/impressum" noindex />;
}

function DatenschutzAliasPage() {
  return <Datenschutz canonicalPath="/datenschutz" noindex />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/events/rfg-nova" component={RfgNova} />
      <Route path="/upcoming-events/rfg-nova" component={RfgNova} />
      <Route path="/upcoming-events" component={UpcomingEvents} />
      <Route path="/berlin-park-cleanup" component={BerlinParkCleanup} />
      <Route path="/crew-radio" component={CrewRadio} />
      <Route path="/impact" component={Impact} />
      <Route path="/partners" component={Partners} />
      <Route path="/artists" component={Artists} />
      <Route path="/get-involved" component={GetInvolved} />
      <Route path="/contact" component={Contact} />
      <Route path="/impressum" component={ImpressumPage} />
      <Route path="/datenschutz" component={DatenschutzPage} />
      <Route path="/imprint" component={ImpressumAliasPage} />
      <Route path="/privacy" component={DatenschutzAliasPage} />
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
