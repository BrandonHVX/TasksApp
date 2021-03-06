import ReactOnRails from 'react-on-rails';

import Tasks from '../bundles/Tasks/components/Tasks';
import Calendar from '../bundles/Calendar/components/Calendar';
import Map from '../bundles/Map/components/Map';

// This is how react_on_rails can see stuff in the browser.
ReactOnRails.register({
  Tasks,
  Calendar,
  Map
});
