import CustomButton from '@/components/FormElements/CustomButton';
import OrderCards from '@/components/OrderCards';
import React from 'react'

const Orders = async () => {
    // order name
    // order price
    // order status: pending || working || complete || faild
    // order starting date: 
    // estimate end time || order completion date
    // order cancel button
    const userData = async () => {
        try {
            await dbConnection();

            const validUser = await UserModel.findOne({ _id: userId }).select("-userPassword");

            if (!validUser) {
                throw new Error("Invalid User")
            }

            return validUser;
        } catch (error) {
            console.log(error)
        }
    }

    const user = await userData();

    return (
        <div className='p-2'>

            {/* current orders */}
            {
                user?.orders.length > 0 && user?.orders.map((order, order_index) => (
                    <OrderCards key={`order_card_${order_index}`} orderId={order?.orderId} orderPrice={order?.orderPrice} orderStatus={order?.orderStatus} orderPlaced={order?.orderPlaced} orderDeliver={order?.orderDeliver} />
                ))
            }

            {/* order history */}

        </div>
    )
}

export default Orders