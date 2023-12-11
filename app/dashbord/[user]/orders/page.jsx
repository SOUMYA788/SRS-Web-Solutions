import OrderCards from '@/components/OrderCards';
import dbConnection from '@/middleware/dbConnection';
import UserModel from '@/models/User';
import Link from 'next/link';
import React from 'react'


const Orders = async ({ params }) => {
    const userId = params.user
    console.log("user id in orders page are ->>", userId);
    // order name
    // order price
    // order status: pending || working || complete || faild
    // order starting date: 
    // estimate end time || order completion date
    // order cancel button
    const getUserOrders = async () => {
        try {
            await dbConnection();

            const validUser = await UserModel.findOne({ _id: userId });

            if (!validUser) {
                throw new Error("Invalid User")
            }

            return validUser.orders;
        } catch (error) {
            console.log(error)
        }
    }

    const orders = await getUserOrders();

    return (
        <section className="w-full">

            <div className="w-full">

                {/* current orders */}
                <h2 className="font-semibold mb-1 capitalize text-2xl">current order</h2>
                {
                    orders.length > 0 && <OrderCards orders={orders} orderFilter="pending" />
                }

                {
                    !orders.length > 0 && <div className="w-full">
                        <h2 className="font-semibold text-center capitalize text-xl"> No Pending Orders Available</h2>
                        <p className="text-center capitalize mt-2 text-sm">For any enquary please <Link href="/contact" className="font-semibold outline-none border-gray-500 py-1 focus:border-b-2">contact us</Link>. We will catch you soon.</p>
                    </div>
                }
            </div>

            <div className="w-full my-7">
                {/* order history */}
                <h2 className="font-semibold mb-1 capitalize text-2xl">order history</h2>

                {
                    orders.length > 0 && <OrderCards orders={orders} orderFilter="done" />
                }

                {
                    !orders.length > 0 && <div className="w-full">
                        <h2 className="font-semibold capitalize my-2 mx-5"> Nothing Found</h2>
                    </div>
                }
            </div>

        </section>
    )
}

export default Orders