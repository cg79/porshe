import React, { useState } from 'react'
import styles from './kpi.module.css'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { Box, Container, Typography } from '@mui/material'
// import { FounderData, FounderTestimonial } from '../../entities/founders'
import FounderCard from '../../components/FounderCard/FounderCard'
import { CompanyProps } from '../../components/data-types/data-types'
import Layout from '../../components/layout'

const FoundersStory = (props: CompanyProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const company = props?.data?.company || null

    const handlePlayButton = () => {
        setIsPlaying(true)
    }

    const handlePauseButton = () => {
        setIsPlaying(false)
    }

    debugger;
    //style={{backgroundImage:`url('${company.bgimg}')`}}

    return company ? (
        <Layout>
            {/* <img
                    src={company.bgimg}
                    style={{
                        width: '100vw',
                        // height: 'auto',
                        position: 'absolute',
                        top: '360px',
                        left: '0',
                        zIndex: '-2',
                    }}
                ></img> */}
            <section className={styles.container} 
            >
                <div className={styles.video}>
                    <div className={styles.playIconContainer}>
                        {!isPlaying && (
                            <Image
                                src="/static/play-icon.svg"
                                className={styles.playIcon}
                                height={isHovering ? 60 : 50}
                                width={isHovering ? 60 : 50}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={() => [handlePlayButton()]}
                            />
                        )}
                    </div>

                    <ReactPlayer
                        url={company.video}
                        playing={isPlaying}
                        width={'800px'}
                        onEnded={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    />
                </div>
                <Box sx={{ height: 50 }} />
                <article className={styles.article}>
                    <Container
                        maxWidth={'md'}
                        sx={{
                            backgroundColor: 'none',
                        }}
                    >
                        <Typography variant="body2" gutterBottom>
                            {company?.description}
                        </Typography>
                    </Container>
                    <Container
                        maxWidth={'md'}
                        sx={{
                            backgroundColor: 'none',
                        }}
                    >
                        {company.founders.map((el: any) => {
                            return (
                                <FounderCard
                                    pictureSrc={
                                        el.image || '/founders/video1.png'
                                    }
                                    name={el.name}
                                    text={el.story}
                                />
                            )
                        })}
                    </Container>
                </article>
            </section>
        </Layout>
    ) : null
}

export default FoundersStory
