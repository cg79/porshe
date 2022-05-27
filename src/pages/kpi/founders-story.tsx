import React, { useState } from 'react'
import styles from './kpi.module.css'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import { Box, Container, Typography } from '@mui/material'
import { FounderData, FounderTestimonial } from '../../entities/founders'
import FounderCard from '../../components/FounderCard/FounderCard'
export default function FoundersStory(props: any) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const handlePlayButton = () => {
        setIsPlaying(true)
    }

    const handlePauseButton = () => {
        setIsPlaying(false)
    }

    return (
        <>
            <section className={styles.container}>
                <div className={styles.video}>
                    <div className={styles.playIconContainer}>
                        <Image
                            src="/svg/play-icon.svg"
                            className={styles.playIcon}
                            height={isHovering ? 60 : 50}
                            width={isHovering ? 60 : 50}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={() => [handlePlayButton()]}
                        />
                    </div>
                    <ReactPlayer
                        url="/founders/video2.mp4"
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
                            The ultimate NFT platform for all sports fans:
                            FANZONE gives you the opportunity to digitally own
                            your stars and get access to exclusive
                            content/experiences. Collect your favorite athletes
                            and trade them with countless other fans to complete
                            your collection.The ultimate NFT platform for all
                            sports fans: FANZONE gives you the opportunity to
                            digitally own your stars and get access to exclusive
                            content/experiences. Collect your favorite athletes
                            and trade them with countless other fans to complete
                            your collection.The ultimate NFT platform for all
                            sports fans: FANZONE gives you the opportunity to
                            digitally own your stars and get access to exclusive
                            content/experiences. Collect your favorite athletes
                            and trade them with countless other fans to complete
                            your collection.
                        </Typography>
                    </Container>
                    <Container
                        maxWidth={'md'}
                        sx={{
                            backgroundColor: 'none',
                        }}
                    >
                        <FounderCard
                            pictureSrc="/founders/video1.png"
                            name="Andrei Mihăiță"
                            text="The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. Collect your favorite athletes and trade them with countless other fans to complete your collection.The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. "
                        />
                        <FounderCard
                            pictureSrc="/founders/video1.png"
                            name="Claudiu"
                            text="The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. Collect your favorite athletes and trade them with countless other fans to complete your collection.The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. "
                        />
                        <FounderCard
                            pictureSrc="/founders/video1.png"
                            name="Daniel"
                            text="The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. Collect your favorite athletes and trade them with countless other fans to complete your collection.The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. "
                        />
                        <FounderCard
                            pictureSrc="/founders/video1.png"
                            name="Florin"
                            text="The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. Collect your favorite athletes and trade them with countless other fans to complete your collection.The ultimate NFT platform for all sports fans: FANZONE gives you the opportunity to digitally own your stars and get access to exclusive content/experiences. "
                        />
                    </Container>
                </article>
            </section>
        </>
    )
}
