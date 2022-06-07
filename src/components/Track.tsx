import styled from 'styled-components';
import TrackSegment from './TrackSegment';

const SegmentContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Track(props) {
    const {
        segments,
        incrementSegment,
        decrementSegment
    } = props;

    return <div>
        <h2>Speed Multiplier from Conditions</h2>
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