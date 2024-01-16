import '@/app/globals.css'
import DashboardNav from '@/components/DashboardNav';
import { getTokenData } from '@/utils/tokendata';
import { cookies } from 'next/headers';

export default async function AdminDashboardLayout({ children }) {
    const cookiesStore = cookies();
    const userId = await getTokenData(null, cookiesStore);
    return (
        <div className='w-full flex flex-col sm:flex-row justify-between gap-2 relative'>
            <DashboardNav userId={userId} forAdmin={true}/>
            <section className='w-full flex flex-col px-2 py-3 gap-2 relative'>
                {children}
            </section>
        </div>
    )
}
