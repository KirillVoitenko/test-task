import React from 'react'
import { Logo } from '../../general/logo/logo'
import styles from './styles.module.css'

interface SignFormProps {
   children?: React.ReactNode,
   onSubmit: (event: React.FormEvent) => void
}

export const SignForm: React.FC<SignFormProps> = ({ onSubmit, children }) => {
   return (
      <form 
         onSubmit={onSubmit} 
         className={styles.signForm}
      >
         <Logo mode='main' />
         { children }
      </form>
   )
}