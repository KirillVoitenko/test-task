import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles.module.css';
import logo from '../../../assets/images/logo.png';

const useLogoStyle = makeStyles({
   root: {
      margin: (props: LogoProps) => 
         (props.mode === 'minimalistic') ? '0' : '10px auto',
      width: (props: LogoProps) => 
         (props.mode === 'minimalistic') ? '40px' : '200px',
      height: (props: LogoProps) => 
         (props.mode === 'minimalistic') ? '40px' : '200px',
      display: 'block',
   }
})

interface LogoProps {
   mode: 'main' | 'minimalistic'
}


export const Logo: React.FC<LogoProps> = (props) => {
   const style = useLogoStyle(props);
   return (
      <React.Fragment>
         <Avatar
            alt='Логотип'
            classes={{root: style.root}}
            src={logo}
         />
         {props.mode !== 'minimalistic' && <h1 className={styles.bankName}>Пенькофф-Банк</h1>}
      </React.Fragment>
   )
}