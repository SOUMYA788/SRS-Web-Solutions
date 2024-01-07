
import { Orders } from '@/components/Orders';
import { getUserOrders } from '@/utils/getUserOrders';
import React from 'react'

const AllOrders = async () => {
  const stringifyOrders = await getUserOrders(null, null, null, process.env.LOGIN_SECRET);
  const userOrders = stringifyOrders ? JSON.parse(stringifyOrders) : null;
  console.log("allUserOrders", userOrders);
  return (
    <Orders orders={userOrders} />
  )
}

export default AllOrders