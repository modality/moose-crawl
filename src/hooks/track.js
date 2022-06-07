import { useState } from 'react';

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export default function useTrack(modifier) {
    const defaultSegments = [1, 2, 2, 3, 3, 3, 4, 4, 5];
    const [segments, setSegments] = useState(defaultSegments);
    const segmentValues = [0.125, 0.25, 0.5, 1, 2, 4, 8];
    const segmentText = ["\u215B", '\u00BC', '\u00BD', '1', '2', '4', '8'];
    const selectedIndex = clamp(
        Math.floor(segments.length/2) + modifier,
        0,
        segments.length-1
    );
    const segmentObjects = segments.map((level, index) => ({
        id: index,
        level,
        value: segmentValues[level],
        text: segmentText[level],
        selected: index == selectedIndex,
    }));

    function incrementSegment(index) {
        if (segments[index] < segmentValues.length - 1) {
            const newSegments = [...segments];
            newSegments[index] = newSegments[index] + 1;
            setSegments(newSegments);
        }
    }
    
    function decrementSegment(index) {
        if (segments[index] > 0) {
            const newSegments = [...segments];
            newSegments[index] = newSegments[index] - 1;
            setSegments(newSegments);
        }
    }

    return [segmentObjects, incrementSegment, decrementSegment];
}
