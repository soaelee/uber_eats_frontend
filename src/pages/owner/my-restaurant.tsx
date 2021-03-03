import { gql, useQuery, useSubscription } from '@apollo/client';
import { data } from 'autoprefixer';
import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import Linking from '../../components/link';
import { Title } from '../../components/title';
import { myRestaurant, myRestaurantVariables } from '../../__api__/myRestaurant';
import { VictoryChart, VictoryVoronoiContainer, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel } from 'victory';
import { pendingOrders } from '../../__api__/pendingOrders';
export const MY_RESTAURANT_QUE = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        id
        name
        coverImg
        category {
          name
          slug
        }
        address
        isPromoted
        menu {
          id
          name
          price
          photo
          description
          options {
            name
            extra
            choices {
              name
              extra
            }
          }
        }
        orders {
          id
          createdAt
          total
        }
      }
    }
  }
`;

const PENDING_ORDERS_SUBSCRIPTIOM = gql`
  subscription pendingOrders {
    pendingOrders {
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
interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data: subscriptionData } = useSubscription<pendingOrders>(PENDING_ORDERS_SUBSCRIPTIOM);
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUE, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
  const history = useHistory();
  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData, history]);
  console.log(data);
  return (
    <div>
      <div
        className="bg-red-500 w-full py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }}
      ></div>
      <div className="container mt-10">
        {data?.myRestaurant.restaurant?.name && <Title message={data?.myRestaurant.restaurant?.name} />}
        <div className="mt-10">
          <Link
            to={`/restaurant/${data?.myRestaurant.restaurant?.id}/add-dish`}
            className="mr-2 text-white py-3 px-8 bg-gray-800"
          >
            Add Dish &rarr;
          </Link>
          <Link to={``} className="text-white py-3 px-8 bg-lime-700">
            Buy Promotion &rarr;
          </Link>
        </div>
        <div className="mt-8">
          {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
            <>
              <h4 className="text-xl mb-5">Please upload a dish.</h4>
              <Linking to={`/restaurant/${data?.myRestaurant.restaurant?.id}/add-dish`} message="Create order &rarr;" />
            </>
          ) : (
            <div className="grid md:grid-cols-3 mb-16 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish) => (
                <Dish key={dish.name} name={dish.name} description={dish.description} price={dish.price} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-xlg font-medium">Sales</h4>
          <div className="mx-auto py-8">
            <VictoryChart
              domainPadding={50}
              height={500}
              width={window.innerWidth}
              theme={VictoryTheme.material}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={<VictoryLabel style={{ fontSize: 18 } as any} renderInPortal dy={-20} />}
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 3,
                  },
                }}
              />
              {/* <VictoryAxis
                style={{ tickLabels: { fontSize: 18, fill: '#4D7C0F' } as any }}
                dependentAxis
                tickFormat={(tick) => `$${tick}`}
              /> */}
              <VictoryAxis
                style={{ tickLabels: { fontSize: 18 } as any }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString('ko')}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
