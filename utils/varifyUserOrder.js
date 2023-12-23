/*
    This function is used in API related orders, and order forms etc...
    Delete this when proper server action is defined on these...
*/

export const varifyUserOrder = (orderPrice, orderStatus, deliverWithin, orderDeliveredDate) => {

    const regex = /^[0-9]+\s[a-z]+/i

    // re-varification of all data
    const hasIncorrectInfo = (!parseInt(formData.orderPrice)) || (!["pending", "delivered", "cancelled"].includes(formData.orderStatus.toLowerCase())) || (!regex.test(formData.deliverWithin)) || (!formData.orderDeliveredDate.includes("-") || formData.orderDeliveredDate.includes("()"))

    // if wrong data provided, then return with error...
    if (hasIncorrectInfo) return null

    return {
        orderDelivered: orderDeliveredDate ? true : false,
        orderPrice, orderStatus, deliverWithin, orderDeliveredDate
    }

}