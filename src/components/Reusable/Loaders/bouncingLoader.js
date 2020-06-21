import React from 'react';
import { motion } from "framer-motion"
import "./loaders.css"

const loaderVariants = {
    animation: {
        x: [-20,20],
        y: [0,-30],
        transition: {
                x: {
                    yoyo: Infinity,
                    duration: 0.5
                },
                y: {
                    yoyo: Infinity,
                    duration: 0.25,
                    ease: "easeOut"
                }
            
        }
    }
}

const BouncingLoader = () => {
    return ( 
            <motion.div className="bouncing-loader"
                variants={loaderVariants}
                animate="animation"
            >
            </motion.div>
     );
}
 
export default BouncingLoader;