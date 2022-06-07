import styled from 'styled-components';
import TrackSegment from './TrackSegment';

const SegmentContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const TrackLabel = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin: 0 2em;
    &.faster {
        float: right;
    }
`;

export default function Track(props) {
    const {
        segments,
        incrementSegment,
        decrementSegment
    } = props;

    return <div>
        <h2>Speed Multiplier Track</h2>
        <p>
            As conditions change for the travelers, the token will move forwards or backwards along the track accordingly. 
            If it is in the Faster section of the track, the rate at which the party can travel across hexes is increased. 
            If it is in the Slower section, the rate is decreased.
        </p>
        <TrackLabel className='faster'>Faster</TrackLabel>
        <TrackLabel>Slower</TrackLabel>
        <SegmentContainer>
            { segments.map((segment) => (
                <TrackSegment 
                    key={`segment-${segment.id}`}
                    text={segment.text}
                    selected={segment.selected}
                    increment={() => incrementSegment(segment.id)}
                    decrement={() => decrementSegment(segment.id)}
                />
            ))}
        </SegmentContainer>
    </div>;
}