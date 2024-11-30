import React from 'react';
import { TbReportAnalytics } from 'react-icons/tb';
import Piechart from './Piechart';

const Clientpriority = ({ low, medium, high }) => {
    const data = [
        { name: 'Complied', value: 37.5 },
        { name: 'Not Complied', value: 17.27 },
        { name: 'Partially', value: 14.22 },
        { name: 'Overdue', value: 31.32 },
    ];

    const colors = ['#40bf40', '#FF8C00', '#e4ba4e', '#f87171'];

    return (
        <div className='pt-4'>
            <div className="flex flex-col md:flex-row gap-8">
                <div className='border border-selectbg shadow-md rounded p-5  md:w-5/6 lg:w-4/5 '>
                    <h5 className='font-semibold  mt-3 mb-5'>Client Priority</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className=" relative overflow-hidden p-5 rounded-lg h-32 border-l-4" style={{ backgroundColor: '#c4ede0', borderColor: '#36b089' }}>
                            <div className=' absolute -top-2 -left-20 bg-green-500 w-48 h-48 rounded-full bg-opacity-10'></div>
                            <div className='absolute left-5 -top-20 bg-green-500 w-48 h-48 rounded-full bg-opacity-5'></div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-center mb-2">
                                    <div className="p-1 rounded" style={{ backgroundColor: '#36b089' }}>
                                        <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
                                    </div>
                                    <div className="ms-5 ps-2 font-bold">
                                        <h5>Low</h5>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold">{low}</p>
                            </div>
                        </div>

                        <div className=" relative overflow-hidden p-5 rounded-lg h-32 border-l-4" style={{ backgroundColor: '#e6e6e6', borderColor: '#003366' }}>
                            <div className=' absolute -top-2 -left-20 bg-violet-400 w-48 h-48 rounded-full bg-opacity-10'></div>
                            <div className='absolute left-5 -top-20 bg-violet-400 w-48 h-48 rounded-full bg-opacity-5'></div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-center mb-2">
                                    <div className="p-1 rounded" style={{ backgroundColor: '#0d3d6e' }}>
                                        <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
                                    </div>
                                    <div className="ms-2 ps-2 font-bold">
                                        <h5>Medium</h5>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold">{medium}</p>
                            </div>
                        </div>

                        <div className=" relative overflow-hidden p-5 rounded-lg h-32 border-l-4" style={{ backgroundColor: '#fde8fd', borderColor: '#ff1a1a' }}>
                            <div className=' absolute -top-2 -left-20 bg-red-400 w-48 h-48 rounded-full bg-opacity-10'></div>
                            <div className='absolute left-5 -top-20 bg-red-400 w-48 h-48 rounded-full bg-opacity-5'></div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-center mb-2">
                                    <div className="p-1 rounded" style={{ backgroundColor: '#ff1a1a' }}>
                                        <TbReportAnalytics style={{ color: 'white', fontSize: '30px' }} />
                                    </div>
                                    <div className="ms-5 ps-2 font-bold">
                                        <h5>High</h5>
                                    </div>
                                </div>
                                <p className="text-xl font-semibold">{high}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border border-selectbg shadow-md rounded">
                    <Piechart
                        pieData={data}
                        COLORS={colors}
                    />
                </div>
            </div>
        </div>
    );
};

export default Clientpriority;