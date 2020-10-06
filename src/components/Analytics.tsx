import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

function Analytics(): null {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_CODE ?? 'no-code', {
      debug: !process.env.REACT_APP_GA_CODE,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return null;
}

export default Analytics;
