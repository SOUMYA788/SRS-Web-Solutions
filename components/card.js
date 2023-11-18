import React from 'react'
/**
 * 
 * @param {Array} contentArray is an array of content
 * @param {string} text_center boolean value, decide text will be center or not
 * @returns JSX
 */
const Card = ({ contentArray, cardHeight, text_center }) => {
    const createMarkup = (c) => {
        return { __html: c }
    }
    return (
        <>
            {
                contentArray.map(({ id, Img, title, name, desc }, contentIndex) => (
                    <div
                        key={id}
                        className={`mb-5 px-6 py-4 w-full sm:w-[200px] md:w-[30%] ${cardHeight || "h-[336px]"} border-2 border-gray-200 border-opacity-80 rounded-lg shadow hover:shadow-lg transition`}
                    >
                        {Img && <div className="w-16 h-16 border-2 border-slate-400 rounded-full mx-auto p-4">
                            <Img className="w-full h-full object-cover" />
                        </div>
                        }
                        <div className={`${Img&&'py-4'}`}>
                            {
                                title && <p className="text-xs text-slate-500 my-1 uppercase">
                                    {title}
                                </p>
                            }
                            <h2 className={`text-lg ${text_center && "text-center"} font-semibold text-gray-900 capitalize`}>
                                {name}
                            </h2>
                            <p className={`leading-relaxed ${text_center && "text-center"} text-sm text-justify`} dangerouslySetInnerHTML={createMarkup(desc)} />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Card