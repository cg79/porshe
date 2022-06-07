import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './NavBar.module.css'
import { ROUTES } from '../../constants/constants'

type ProileButtonProps = {
    onSignOut: () => void
}

const ProfileButton: React.FC<ProileButtonProps> = ({ onSignOut }) => {
    const router = useRouter()
    return (
        <div className={`font-porsche ${styles.dropdown}`}>
            <Link href={ROUTES.CHANGE_PASSWORD} scroll={false}>
                <div>Change Password</div>
            </Link>
            <div onClick={() => onSignOut()}>Sign Out</div>
        </div>
    )
}

export default ProfileButton
