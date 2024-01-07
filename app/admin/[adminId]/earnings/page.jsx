import { BorderContainerStyle1 } from '@/components/BorderContainer';
import { Payments } from '@/components/Payments';
import { getUserOrders } from '@/utils/getUserOrders';
import React from 'react'

const Earnings = async () => {
  const stringifyOrders = await getUserOrders(null, null, null, process.env.LOGIN_SECRET);
  const userOrders = stringifyOrders ? JSON.parse(stringifyOrders) : null;

  return (
    <>
      <section className="w-full">
        <h2 className="uppercase font-semibold mb-2 text-base"> overall earnings</h2>
        <BorderContainerStyle1>
          <Payments payments={userOrders} />
        </BorderContainerStyle1>
      </section>
    </>
  )

}

export default Earnings