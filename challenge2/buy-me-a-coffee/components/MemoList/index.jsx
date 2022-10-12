import styles from './styles.module.css'

export const MemoList = ({memos}) => {
  return(
    <>
      <h2 className={styles.subtitle}>Memos Received</h2>
      <ul className={styles.list}>
        {
          memos.map((memo) => {
            return <li key={memo.timestamp}>
              <p>{`"${memo.message}"`}</p>
              <p>From: {memo.name} at {memo.timestamp.toLocaleString()}</p>
            </li>
          })
        }
      </ul>
    </>
  )
}