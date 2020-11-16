import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

function Analytics(): null {
  const router = useRouter();
  const location = router.pathname;

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_CODE?.toString() ?? 'no-code', {
      debug: !process.env.REACT_APP_GA_CODE,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return null;
}

export default Analytics;
