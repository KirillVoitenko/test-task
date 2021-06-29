import React from 'react';
import styles from './styles.module.css';
import { Button, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useHeaderStyle = makeStyles({
   root: {
      display: 'flex',
      padding: '10px',
      backgroundColor: 'lightsteelblue',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontSize: '0.875rem',
      fontWeight: 'bolder',
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
      lineHeight: '1.75',
      letterSpacing: '0.02857em'
   }
})

export const PageHeader: React.FC = () => {
   const history = useHistory();
   const usedStyle = useHeaderStyle();
   const onLogout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      history.replace('/authorization');
      //clear userinfo
   }

   return (
      <Paper
         variant='outlined'
         classes={{root: usedStyle.root}}
      >
         <div className={styles.headLogo}>Пенькофф-Банк</div>
         <div className={styles.userInfo}>UserInfo</div>
         <Button
            onClick={onLogout}
         >
            Выйти
         </Button> 
      </Paper>
   )
}