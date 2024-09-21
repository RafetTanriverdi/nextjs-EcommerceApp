'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import axiosInstance from '../../../network/httpRequester';
import { ENDPOINT } from '../../../network/EndPoint';
import OrdersCard from './(page-component)/OrdersCard/OrdersCard';


const OrdersContianer = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        return axiosInstance.get(ENDPOINT.ORDERS.LIST);
      },
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      <>
        {data?.data.map((item:any) => (
          <OrdersCard key={item.orderId} props={item} />
        ))}
      </>
    );
  };

  export default OrdersContianer;