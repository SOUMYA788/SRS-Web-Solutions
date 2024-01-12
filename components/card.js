import React from 'react'
import Image from 'next/image'

const Card = ({ cardContent, className, text_center }) => {

    const createMarkup = (c) => {
        return { __html: c }
    }

    const Cardimage = cardContent?.img

    return (
        <>
            <div className={`w-fit mx-auto p-2 dark:text-slate-400 flex border-2 border-gray-200 border-opacity-80 rounded-md shadow hover:shadow-lg transition ${className}`}
            >
                {
                    cardContent?.img && <div className={`w-16 h-16 mx-auto flex items-center justify-center`}>
                        {
                            (typeof cardContent?.img !== "string") ? <Cardimage className="w-full h-full p-4 border-2 border-slate-400 rounded-full" /> : <Image src={cardContent?.img} width={100} height={100} className={"w-full h-full object-cover border-2 border-slate-400"} />
                        }
                    </div>
                }

                <div className="w-full h-full flex-1 p-1">
                    {cardContent?.title && <p className="text-xs mb-1 dark:text-slate-500 uppercase">{cardContent.title}</p>}

                    <h2 className={`text-lg ${text_center && "text-center"} font-semibold text-gray-900 dark:text-white capitalize`}> {cardContent?.name} </h2>

                    <p className={`leading-relaxed ${text_center && "text-center"} text-sm dark:text-slate-400 text-justify`} dangerouslySetInnerHTML={createMarkup(cardContent?.desc)} />
                </div>
            </div>
        </>
    )
}

export default Card