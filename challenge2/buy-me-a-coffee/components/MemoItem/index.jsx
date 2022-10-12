import styles from './styles.module.css'

export const MemoItem = ({message, name, timestamp}) => {
  return(
    <li className={styles.item}>
      <p className={styles.message}>{`"${message}"`}</p>
      <p>From: {name} at {timestamp.toLocaleString()}</p>
    </li> 
  )
}