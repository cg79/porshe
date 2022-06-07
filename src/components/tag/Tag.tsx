import styles from './style.module.css'

type TagProps = {
    name: string
}

const Tag: React.FC<TagProps> = ({ name }) => {
    return <span className={styles.tag}>#{name.toUpperCase()}</span>
}

export default Tag
