import OrderCards from '@/components/OrderCards';
import { getUserData } from '@/utils/getUserData';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'
import { BiHistory } from 'react-icons/bi';

const Orders = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserData(null, cookiesStore);
    const { userName, userEmail, orders } = JSON.parse(stringifyUser);

    if (!userEmail) return <h2 className="w-full text-center font-semibold">Please refresh the browser or login in again.</h2>

    return (
        <section className="w-full">

            <div className="w-full">

                {/* current orders */}
                <h2 className="mb-1 capitalize text-2xl font-semibold text-slate-700">current order</h2>
                {
                    orders.length > 0 && <OrderCards orders={orders} orderFilter="pending" />
                }

                {
                    !orders.length > 0 && <div className="w-full">
                        <h2 className="text-center capitalize text-xl"> No Pending Orders Available</h2>
                        <p className="text-center capitalize mt-2 text-sm text-slate-700">For any enquary please <Link href="/contact" className="font-semibold outline-none border-gray-500 py-1 focus:border-b-2">contact us</Link>. We will catch you soon.</p>
                    </div>
                }
            </div>

            <div className="w-full my-10">
                {/* order history */}
                <div className="w-full flex flex-row gap-2 text-2xl items-center font-semibold text-slate-700">
                    <BiHistory className="text-inherit" />
                    <h2 className="mb-1">Order history</h2>
                </div>

                {
                    orders.length > 0 && <OrderCards orders={orders} orderFilter="done" />
                }

                {
                    !orders.length > 0 && <div className="w-full">
                        <h2 className="capitalize my-2 mx-5"> Nothing Found</h2>
                    </div>
                }
            </div>

        </section>
    )
}

export default Orders