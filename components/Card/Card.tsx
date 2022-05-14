import type { Event } from 'interfaces';
import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import cx from 'classnames';

import styles from 'styles/Home.module.scss';

interface CardProps {
  event: Event;
}

const Card = ({ event }: CardProps) => {

  const startTime = event.starts_at ? moment(event.starts_at) : null;
  const endTime = event.ends_at ? moment(event.ends_at) : null;

  return (
    <div key={event.id} className="relative transition-shadow duration-200 ease-in mb-8 rounded-md overflow-hidden bg-white shadow hover:shadow-xl">
      <div className={cx({
        [styles.imageContainer]: event.hero_url,
        'h-60 bg-slate-300 flex justify-center items-center': !event.hero_url,
      })}>
        {event.hero_url && <Image src={event.hero_url} layout="fill" className={styles.image} alt="" />}
        {!event.hero_url && <div className="text-2xl text-gray-100 font-semibold">No Banner</div>}
      </div>
      {event.short_description && (
        <div className="p-5">
          {event.short_description}
        </div>
      )}
      {event.panelists && event.panelists.length > 0 && (
        <div className="px-5 pb-5">
          <div className="text-xl">Panelists:</div>
          <div>
            {event.panelists.map((panelist, index: number) => (
              <div key={index} className="flex justify-start items-center mt-2">
                <div>
                  {panelist.avatar_url && (
                    <Image src={panelist.avatar_url} width={40} height={40} alt="" />
                  )}
                </div>
                <div className="pl-2 relative -top-1">
                  <div className="text-base">{panelist.name}</div>
                  <div className="text-xs">{panelist.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {startTime && (
        <div className="flex px-5">
          <div>Start Time: </div>
          <div className="ml-2">{`${startTime.format('DD MMMM, YYYY')} at ${startTime.format('hh:mm a')}`}</div>
        </div>
      )}
      {endTime && (
        <div className="flex px-5 pb-5">
          <div>End Time: </div>
          <div className="ml-2">{`${endTime.format('DD MMMM, YYYY')} at ${endTime.format('hh:mm a')}`}</div>
        </div>
      )}
    </div>
  );
}

export default Card;
