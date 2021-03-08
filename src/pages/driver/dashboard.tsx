import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { gql, useSubscription } from '@apollo/client';
import { cookedOrders } from '../../__api__/cookedOrders';
import { Link } from 'react-router-dom';

const COOKED_ORDERS_SUBS = gql`
  subscription cookedOrders {
    cookedOrders {
      id
      createdAt
      updateAt
      customer {
        email
      }
      driver {
        email
      }
      restaurant {
        name
      }
      total
      status
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const { data: cookedOrdersData } = useSubscription<cookedOrders>(COOKED_ORDERS_SUBS);
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#000',
          strokeOpacity: 1,
          strokeWeight: 5,
        },
      });
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          },
          destination: {
            location: new google.maps.LatLng(driverCoords.lat + 0.05, driverCoords.lng + 0.05),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
      console.log(cookedOrdersData.cookedOrders);
    }
  }, [cookedOrdersData]);
  return (
    <div>
      <div className="overflow-hidden" style={{ width: window.innerWidth, height: '50vh' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={15}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          draggable={true}
          bootstrapURLKeys={{ key: 'AIzaSyB3l9FffP3ODWJ8PS0bSNgfScxlpAjFsdg' }}
        ></GoogleMapReact>
      </div>
      <div className=" max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center  text-3xl font-medium">New Cooked Order</h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @ {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h1>
            <Link to={`/orders/${cookedOrdersData?.cookedOrders.id}`} className="btn w-full  block  text-center mt-5">
              Accept Challenge &rarr;
            </Link>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">No orders yet...</h1>
        )}
      </div>
    </div>
  );
};
