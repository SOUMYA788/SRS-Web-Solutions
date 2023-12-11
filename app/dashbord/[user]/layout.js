import '@/app/globals.css'
import DashboardNav from '@/components/DashboardNav';

export default async function DashboardLayout({ children, params }) {
    const userId = params.user.toString();
    return (
        <>
            <div className='w-full flex flex-row justify-between gap-2'>
                <DashboardNav userId={userId} />
                <section className='w-full flex flex-row px-2 py-3 gap-2 relative'>
                    {children}
                </section>
            </div>
        </>

    )
}
