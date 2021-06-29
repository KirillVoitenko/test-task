import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.module.css'
import { Fade } from '@material-ui/core';

interface LoadOptions {
   load: boolean;
   onLoad: (isLoad: boolean) => void;
}

export const loadContext = React.createContext<LoadOptions>({ load: false, onLoad: () => { } })

export const Loader: React.FC = ({ children }) => {
   const [load, onLoad] = React.useState<boolean>(false);
   return (
      <loadContext.Provider value={{ load: load, onLoad: onLoad }}>
         <div className={styles.fadeContainer}>
            <Fade in={load} timeout={1000}>
               <div className={styles.container}>
                  <CircularProgress className={styles.circular} color="secondary" />
               </div>
            </Fade>
         </div>
         {children}
      </loadContext.Provider>
   )
}