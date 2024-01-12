import { Orders } from '@/components/Orders';
import { getUserOrders } from '@/utils/getUserOrders';
import { cookies } from 'next/headers';
import Link from 'next/link';
// import React from 'react'

const UserDashboardOrders = async () => {
    const cookiesStore = cookies();
    const stringifyUser = await getUserOrders(null, cookiesStore);
    const data = JSON.parse(stringifyUser);

    if (!data.length > 0) return (
        <div className="w-full">
            <h2 className="text-center capitalize text-xl"> No Orders Available</h2>
            <p className="text-center capitalize mt-2 text-sm text-slate-700">For any enquary please <Link href="/contact" className="font-semibold outline-none border-gray-500 py-1 focus:border-b-2">contact us</Link>. We will catch you soon.</p>
        </div>
    )

    return (
        <>
            <Orders orders={data} />
        </>
    )
}

export default UserDashboardOrders