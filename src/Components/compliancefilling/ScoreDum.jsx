import React, { useState } from 'react'

const Dummy = ({ percent, things }) => {
    const radius = 20
    const strokeWidth = 3
    const circumference = 2 * Math.PI * radius
    const strokeDashOffset = circumference - (circumference * percent) / 100

    return (
        <>
            <div className='relative flex items-center justify-center'>
                <svg width={50} height={50} className='transform -rotate-90 z-10'>
                    <circle cx={25} cy={25} r={radius} stroke='transparent'
                        strokeWidth={strokeWidth} fill='transparent'
                    />
                    <circle cx={25} cy={25} r={radius} stroke={`${things.label === 'totalCom' ? 'purple' :
                        `${things.label === 'complied' ? 'green' :
                            `${things.label === 'notComplied' ? 'red' :
                                `${things.label === 'partiallyCom' ? 'rgb(144, 134, 1)' :
                                    `${things.label === 'overDue' ? 'rgb(149, 75, 0)' : ''}`}`}`}`} `}
                        strokeWidth={strokeWidth} fill='transparent'
                        strokeDasharray={circumference} strokeDashoffset={strokeDashOffset}
                        strokeLinecap='round'
                    />
                </svg>
                <div className="absolute flex items-center  justify-center">
                    <span className={`${things.label === 'totalCom' ? 'bg-fuchsia-400' :
                        `${things.label === 'complied' ? 'bg-green-400' :
                            `${things.label === 'notComplied' ? 'bg-red-300' :
                                `${things.label === 'partiallyCom' ? 'bg-yellow-300' :
                                    `${things.label === 'overDue' ? 'bg-orange-300' : ''}`}`}`}`} 
                                w-11 h-11  flex items-center justify-center rounded-full text-xs`}>{percent}%</span>
                </div>
            </div >
        </>
    )
}

export default Dummy
