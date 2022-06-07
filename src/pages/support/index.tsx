import React from 'react'
import Navbar from '../../components/Navbar'
import { SUPPORT_EMAIL } from '../../constants/constants'
import IdentityStore from '../../store/identity-store'
import Layout from '../../components/layout'

export default function Support(props: any) {
    if (props && props.porsche_user) {
        IdentityStore.setLoggedUser(JSON.parse(props.porsche_user))
    }

    return (
        <Layout>
            <Navbar>
                <div
                    className="font-porsche"
                    style={{
                        marginTop: '60px',
                        fontSize: '40px',
                        height: '70vh',
                        overflow: 'hidden',
                        display: 'grid',
                        fontWeight: '500',
                        placeContent: 'center',
                    }}
                >
                    <a href={`mailto:${SUPPORT_EMAIL}`}>Send feedback</a>
                </div>
            </Navbar>
        </Layout>
    )
}
export async function getServerSideProps({ req }: { req: any }) {
    const response = { props: { porsche_user: req.cookies.porsche_user || '' } }

    return response
}
