import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Image from 'next/image';

export default function Example(props) {
  const fetchTitle = async (link) => {
    console.log(link);
    if (link.length < 1) {
      return '';
    } else {
      const data = await fetch(`/api/cors?url=${link}`).then((resp) => {
        return resp.text().then((body) => {
          if (resp.status === 200) {
            return body;
          } else {
            return body;
          }
        });
      });

      let regex = /\n/g;
      let result = data.replace(regex, '');

      const doc = parser(result);

      let url = new URL(link);
      let host = url.host.toString();
      console.log(doc.props.children);
      try {
        const urltitle = doc.props.children
          .filter((child) => child.type === 'head')[0]
          .props.children.filter((child) => child.type === 'title')[0]
          .props.children;
        console.log(urltitle);
        if (urltitle) {
          return urltitle;
        }
        return '';
      } catch (error) {
        getError(error);
        return '';
      }
    }
  };
  var items = [
    {
      image: '/images/IMG-20221116-WA0017.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48_1.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48_2.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48_3.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48_4.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48_5.jpg',

      className: 'midimage',
    },
    {
      image: '/images/PHOTO-2022-11-16-12-48-48.jpg',

      className: 'midimage',
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <div
        style={{
          height: '85vh',
          objectFit: 'contain',
          backgroundImage: `${props.item.image}`,
          borderRadius: '5px',
        }}
      >
        <img
          src={props.item.image}
          alt="logo"
          style={{
            position: 'relative',
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </Paper>
  );
}
