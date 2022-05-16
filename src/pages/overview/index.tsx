import React from 'react'
import Navbar from '../../components/Navbar'
import IdentityStore from '../../store/identity-store'

export default function Overview(props: any) {
    if (props && props.porsche_user) {
        IdentityStore.setLoggedUser(JSON.parse(props.porsche_user))
    }

    return (
        <Navbar>
            <div>overview page</div>
        </Navbar>
    )
}

export async function getServerSideProps({ req, res }) {
    const response = { props: { porsche_user: req.cookies.porsche_user || '' } }

    return response
}
