
"use client";

import { section } from "framer-motion/client";
import CountUp from "react-countup";

const stats = [
    {
        num : 3500 ,
        text : " Satellites"

    },
    {
        num : 64 ,
        text : " Countries"

    },
    
];

const Stats = ( )=> {
    return(
        <section className=" mx-auto bg-black py-10 h-auto">
            <div className="text-white flex flex-wrap mx-auto xl:max-w-none mt-10">
                {stats.map((item,index) => {
                    return (
                    <div className="flex flex-1 flex-col items-center justify-center" key={index}>
                        <div className="text-purple1 text-2xl xl:text-4xl font-bold">
                        <CountUp 
                        end={item.num} 
                        duration={2} 
                        delay={1} 
                        />+
                        </div>
                        <p className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} text-gray-600 text-xl text-center mt-4`}
                        >
                            {item.text}</p>
                    </div>
                    )
                }
                )}
                <div className="flex flex-1 flex-col items-center justify-center">
                    <p className="text-purple1 text-2xl xl:text-4xl font-bold">
                    <CountUp 
                        end={25} 
                        duration={2} 
                        delay={1} 
                        />
                    </p>
                    <p className="text-gray-600 text-xl text-center mt-4">ms Average Ping</p>
                </div>
            </div>
        </section>

    );
}

export default Stats