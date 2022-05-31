import { OverviewProps } from '../data-types/data-types'

const OverviewCard = (props: any) => {
    const {
        m1,
        m2,
        m3,
        m4,
        m4_text = '',
        m5,
        m5_text = '',
        onClick,
    } = props.props

    const executeClick = () => {
        // debugger;
        if (!onClick) {
            return
        }

        onClick()
    }

    return (
        <div
            className="linebk mt10"
            style={{
                width: '18%',
                marginRight: '45px',
                minWidth: '200px',
            }}
            onClick={executeClick}
        >
            <div
                style={{ marginLeft: '20px', marginTop: '20px' }}
                className="relative"
            >
                <div className="one font-porsche">{m1}</div>
                <div
                    className=""
                    style={{
                        fontWeight: '700',
                        fontSize: '70px',
                    }}
                >
                    {m2}
                </div>

                <div
                    style={{
                        fontSize: '12px',
                        marginLeft: '10px',
                        position: 'relative',
                        bottom: '15px',
                        fontWeight: '700',
                    }}
                >
                    {m3}
                </div>

                <div className="flex">
                    <div className="one bold">{m4}</div>
                    <div
                        className="one ml1"
                        style={{
                            marginLeft: '5px',
                            fontWeight: '100',
                            maxInlineSize: '250px',
                        }}
                    >
                        {m4_text}
                    </div>
                </div>

                <div className="flex">
                    <div className="one bold">{m5}</div>
                    <div
                        className="one"
                        style={{
                            marginLeft: '5px',
                            fontWeight: '100',
                        }}
                    >
                        {m5_text}
                    </div>
                </div>

                <div className="mt10">&nbsp;</div>
            </div>
        </div>
    )
}

export default OverviewCard
