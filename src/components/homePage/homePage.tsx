import React from 'react';
import styles from './styles.module.css'; 
import { PageHeader } from './pageHeader/pageHeader';
import { MainInfo } from './mainInfo/mainInfo';

export const HomePage: React.FC = () => {
   
   return (
      <div className={styles.container}>
         <PageHeader />
         <MainInfo />
      </div>
   )
}