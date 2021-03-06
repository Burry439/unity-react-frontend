import React, { useLayoutEffect,useContext} from 'react';
import { motion, useAnimation } from "framer-motion"
import arcadeMachineStyles from  "./arcadeMachine.module.scss"
import { GamesContext } from "../../../contexts/gamesContext";


export default function ArcadeMachine({arcadeText,t, ...props}) {
  
  const arcadeTextVariants = {
    initial : {
      opacity : 1
    },
    visible : {
      opacity : 1
    },
    blink : {
      opacity : [0,1],
      transition : {
        duration : 2.0
      }
    }

  }
  const arcadeTextControler = useAnimation()
  const { games } = useContext(GamesContext)

  useLayoutEffect(() =>{
    arcadeTextControler.start("blink")
  },[arcadeText])
 

  return (
    <>
    
    <div className={arcadeMachineStyles.arcadeTextContainer} transform="scale(.8361 1.196)" x="55.91737" y="-38.028809" fontFamily="sans-serif" fontSize="96.58px" strokeWidth="1.3414" style={{lineHeight: '1.25'}} xmlSpace="preserve">
 
       <motion.p 
       initial="initial"
       variants={arcadeTextVariants} 
       animate={arcadeTextControler} 
       exit="exit" className={`${arcadeMachineStyles.arcadeText}   ${arcadeMachineStyles[arcadeText.fontSize]}`}
        >
        { games.selectedGame ?  arcadeText.text : t("notFoundTitle")}
      </motion.p> 
    </div>

    <svg version="1.1" viewBox="0 0 559.02 704.93" xmlns="http://www.w3.org/2000/svg" width="559.02" height="704.93" {...props}>
      <g transform="matrix(1.0667 0 0 1.0667 1.402 175.21)">
        <rect x="-.0088875" y="-164.25" width="522.76" height="660.05" ry={0} fill="#666" strokeWidth=".69783" />
        <rect x="66.24" y="57.205" width={384} height="264.97" fill="#1a1a1a" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".89909" />
        <g transform="matrix(2.8215,0,0,2.1932,-166.88,-2687)">
          <path d="m228.15 1379.6h-154.17v-135.91h154.17zm-169.47 18.516h184.77v-172.94h-184.77z" fill="#ccc" />
        </g>
        <g transform="matrix(3.1819,0,0,3.4195,-64.804,-4488.9)">
          <g transform="matrix(1.5055 -.00195 -.001871 -1.2508 -686.03 2079.1)">
            <g transform="matrix(.088517 1.645e-5 1.3113e-5 .099068 489.35 452.23)">
              <g transform="translate(854.09,629.3)" fill="#d40000">
                <path d="m0 0c0-17.375-14.085-31.46-31.46-31.46s-31.461 14.085-31.461 31.46 14.086 31.46 31.461 31.46 31.46-14.085 31.46-31.46" fill="#d40000" />
              </g>
              <g transform="translate(822.63,593.55)" fill="#d40000">
                <path d="m0 0c-3.367 0-6.612.523-9.662 1.483v-94.582h19.324v94.582c-3.051-.961-6.295-1.483-9.662-1.483" fill="#d40000" />
              </g>
              <g transform="translate(905.01,438.94)" fill="#800000">
                <path d="m0 0h-168.02l11.999 58.123h144.02l11.999-58.123z" fill="#800000" />
              </g>
              <ellipse transform="scale(1,-1)" cx="831.55" cy="-643.93" rx="11.815" ry="9.3398" fill="#ffe8eb" />
            </g>
            <g transform="matrix(.047063 0 0 .047063 545.3 499.53)">
              <path d="m0 0c-15.592-4.839-38.633-7.901-64.343-7.901-25.708 0-48.752 3.061-64.346 7.9-12.894 4.001-20.695 9.217-20.695 14.923v-29.845c0-1.158.324-2.294.943-3.405 6.125-10.99 41.443-19.418 84.098-19.418 42.656 0 77.973 8.428 84.098 19.418 0 0 .615 1.611.719 2.218.105.608.147 2.125.147 2.125v27.968c-.805-5.337-8.44-10.202-20.621-13.983" fill="#d13a46" />
            </g>
            <ellipse transform="scale(1,-1)" cx="542.22" cy="-500.54" rx="3.7707" ry="1.0485" fill="#d40000" />
            <g transform="translate(11.635,3.7641)">
              <g transform="matrix(.047063 0 0 .047063 541.66 495.72)">
                <path d="m0 0c-15.592-4.839-38.633-7.901-64.343-7.901-25.708 0-48.752 3.061-64.346 7.9-12.894 4.001-20.695 9.217-20.695 14.923v-29.845c0-1.158.324-2.294.943-3.405 6.125-10.99 41.443-19.418 84.098-19.418 42.656 0 77.973 8.428 84.098 19.418 0 0 .615 1.611.719 2.218.105.608.147 2.125.147 2.125v27.968c-.805-5.337-8.44-10.202-20.621-13.983" fill="#d13a46" />
              </g>
              <ellipse transform="scale(1,-1)" cx="538.97" cy="-496.34" rx="3.7707" ry="1.0485" fill="#d40000" />
            </g>
          </g>
        </g>
        <path d="m27.964-149.76 468.95 1.342-2.8892 126.97-465.85-2.5387z" fill="#0bff68" fillOpacity=".4375" stroke="#000" strokeWidth="9.3747" style={{mixBlendMode: 'overlay'}} />

      </g>
      <g transform="translate(-261.96 414.79)">
        <path d="m350.12 227.3c6.0728 0 11.047 4.1313 11.047 9.1756s-4.9737 9.1756-11.047 9.1756-11.047-4.1313-11.047-9.1756 4.9737-9.1756 11.047-9.1756z" fill="#656d78" strokeWidth="1.2585" />
        <path d="m471.63 218.13c-12.147 0-22.093 8.2614-22.093 18.351 0 10.09 9.946 18.351 22.093 18.351s22.093-8.2614 22.093-18.351c0-10.09-9.946-18.351-22.093-18.351z" fill="#ffce54" strokeWidth="1.2585" />
        <g transform="matrix(1.3808,0,0,1.1469,-278.01,-113.78)" opacity=".5">
          <path d="m534.9 305.38c0-7.406 5.125-13.633 12-15.43-1.281-.336-2.609-.57-4-.57-8.797 0-16 7.203-16 16s7.203 16 16 16c1.391 0 2.719-.234 4-.57-6.875-1.797-12-8.024-12-15.43z" fill="#fff" />
        </g>
        <g transform="matrix(1.3808,0,0,1.1469,-278.01,-113.78)" opacity=".2">
          <path d="m550.9 305.38c0 7.406-5.125 13.633-12 15.43 1.281.336 2.609.57 4 .57 8.797 0 16-7.203 16-16s-7.203-16-16-16c-1.391 0-2.719.234-4 .57 6.875 1.797 12 8.024 12 15.43z" />
        </g>
        <path d="m515.82 273.18h-198.84v-73.404h198.84zm-165.7-27.527c6.0728 0 11.047-4.1313 11.047-9.1756s-4.9737-9.1756-11.047-9.1756-11.047 4.1313-11.047 9.1756 4.9737 9.1756 11.047 9.1756zm121.51-27.527c-12.147 0-22.093 8.2614-22.093 18.351 0 10.09 9.946 18.351 22.093 18.351s22.093-8.2614 22.093-18.351c0-10.09-9.946-18.351-22.093-18.351z" fill="#ccd1d9" strokeWidth="1.2585" />
        <g transform="matrix(1.3808,0,0,1.1469,-458.53,-106.4)" fill="#3a3847">
          <path d="m708.77 338.95h-144c-2.211 0-4-1.789-4-4v-64c0-2.211 1.789-4 4-4h144c2.211 0 4 1.789 4 4v64c0 2.211-1.789 4-4 4zm-140-8h136v-56h-136z" />
          <path d="m671.7 320.57c-2.211 0-4-1.789-4-4v-32c0-2.211 1.789-4 4-4s4 1.789 4 4v32c0 2.211-1.789 4-4 4z" />
          <path d="m671.7 320.57c-11.031 0-20-8.969-20-20s8.969-20 20-20 20 8.969 20 20-8.969 20-20 20zm0-32c-6.617 0-12 5.383-12 12s5.383 12 12 12 12-5.383 12-12-5.383-12-12-12z" />
          <path d="m585.63 306.95c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-16c-2.207 0-4 1.797-4 4s1.793 4 4 4 4-1.797 4-4-1.793-4-4-4z" />
          <path d="m585.89 318.43c-2.211 0-4-1.789-4-4v-8c0-2.211 1.789-4 4-4s4 1.789 4 4v8c0 2.211-1.789 4-4 4z" />
        </g>
      </g>
    </svg>
    </>
  );
}
