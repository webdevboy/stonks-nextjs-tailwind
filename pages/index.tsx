import type { NextPage } from 'next';
import type { Moment } from 'moment';
import type { ChangeEvent } from 'react';
import type { Event } from 'interfaces';
import { useCallback, useState } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';

// Components
import { Card, Filter } from 'components';

interface HomeProps {
  events: Event[];
}

interface SortOption {
  value: string;
  label: string;
}

const sortItems = [
  { value: 'date_asc', label: 'Dates Ascending' },
  { value: 'date_desc', label: 'Dates Descending' },
];

const Home: NextPage<HomeProps> = ({ events }) => {

  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortItems[0]);
  const [panelistAvailableFilter, setPanelistAvailableFilter] = useState<boolean>(false);
  const [featuredFilter, setFeaturedFilter] = useState<boolean>(false);

  const sortEventsAsc = useCallback((events: Event[]) => {
    return events.sort((event1: Event, event2: Event): number => {
      const date1: Moment = moment(event1.starts_at);
      const date2: Moment = moment(event2.starts_at);
      return date1.unix() - date2.unix();
    });
  }, []);

  const applySort = useCallback((events: Event[]) => {
    switch(selectedSort?.value) {
      case 'date_asc': {
        return sortEventsAsc(events);
        break;
      }
      case 'date_desc': {
        return sortEventsAsc(events).reverse();
        break;
      }
      default: {
        return events;
      }
    }
  }, [sortEventsAsc, selectedSort]);

  const applyFilters = useCallback((events: Event[]) => {
    let updatedEvents = events;
    if (panelistAvailableFilter) {
      updatedEvents = updatedEvents.filter((event: Event) => event.panelists && event.panelists.length > 0);
    }
    if (featuredFilter) {
      updatedEvents = updatedEvents.filter((event: Event) => event.featured);
    }
    return updatedEvents;
  }, [panelistAvailableFilter, featuredFilter]);

  const getUpdatedEvents = useCallback(() => {
    const sortedEvents = applySort(events);
    const filteredEvents = applyFilters(sortedEvents);
    return filteredEvents;
  }, [events, applyFilters, applySort]);

  return (
    <div className="pt-10">
      <h1 className="text-center text-4xl mb-12">Upcoming Events</h1>
      <div className="flex items-center mb-12 px-16">
        <div className="flex items-center">
          <div className="mr-4">Sort by: </div>
          <Select
            value={selectedSort}
            onChange={(sortItem: SortOption | null) => setSelectedSort(sortItem)}
            options={sortItems}
          />
        </div>

        <div className="flex items-center ml-10">
          <div className="mr-4">Filters: </div>
          <Filter
            id="panelist-checkbox"
            label="Panelist available"
            checked={panelistAvailableFilter}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPanelistAvailableFilter(e.target.checked)}
          />
          <div className="ml-4">
            <Filter
              id="featured-checkbox"
              label="Featured"
              checked={featuredFilter}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFeaturedFilter(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <Masonry breakpointCols={3} className="flex w-auto ml-8 pr-16" columnClassName="bg-clip-padding pl-8">
        {getUpdatedEvents().map((event) => <Card key={event.id} event={event} />)}
      </Masonry>
    </div>
  )
}

export async function getStaticProps() {
  const res = await axios.get('https://api.stonks.com/principal/event?status=upcoming&perPage=25&orderBy=starts_at,ASC');

  return {
    props: {
      events: res?.data?.data,
    },
  }
}

export default Home;
