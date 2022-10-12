import { MemoItem } from '../MemoItem'
import styles from './styles.module.css'

export const MemoList = ({memos}) => {
  return(
    <>
      <h2 className={styles.subtitle}>Memos Received</h2>
      <ul className={styles.list}>
        {
          memos.map((memo) => {
            return <MemoItem key={memo.timestamp} {...memo} />
          })
        }
      </ul>
    </>
  )
}