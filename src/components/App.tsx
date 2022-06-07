import styled from 'styled-components';
import logic from 'logic_js';

import { useEffect } from 'react';
import useConditions from '../hooks/conditions';
import useTrack from '../hooks/track';
import useSolver from '../hooks/solver';

import Track from './Track';
import Condition from './Condition';
import Calculation from './Calculation';

const Container = styled.div`
    width: 90%;
    max-width: 920px;
    margin: 0 auto;
    height: 100%;
    background: white;
`;

const Horizontal = styled.div`
    display: flex;
    width: 100%;
`;

const Header = styled.div`
    width: 100%;
    padding: 1em;
`

const Section = styled.section`
    width: 50%;
    padding: 1em;
`;

export function App(props) {
    window.logic = logic;

    const [allConditions, conditions, modifier, goldCostPerDay, setConditionEnabled] = useConditions();
    const [segmentObjects, incrementSegment, decrementSegment] = useTrack(modifier);
    const conditionsMultiplier = segmentObjects.find(s => s.selected).value;    
    const [outputs, solveForKey, setInput, solveForInput] = useSolver({
        baseMilesPerHour: 0.5,
        hoursPerTravelingDay: 8,
        conditionsMultiplier,
        daysTraveled: 1,
        goldCostPerDay,
        milesTraveled: 0,
        milesPerHex: 20,
    }, 'milesTraveled');

    useEffect(() => {
        setInput("goldCostPerDay", goldCostPerDay);
        setInput("conditionsMultiplier", conditionsMultiplier);
    }, [goldCostPerDay, conditionsMultiplier]);

    return (
        <Container>
            <Header>
                <h1>Moose Crawl&trade; Calculator</h1>
                <Track 
                    segments={segmentObjects}
                    modifier={modifier}
                    incrementSegment={incrementSegment}
                    decrementSegment={decrementSegment}
                />
            </Header>
            <Horizontal>
                <Section>
                    <h2>Traveling Conditions</h2>
                    <table id="conditions-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Condition</th>
                                <th width="20%">Cost</th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            { allConditions.map((condition) => (
                                <Condition 
                                    onChange={(event) => {
                                        setConditionEnabled(condition.id, event.target.checked);
                                    }} 
                                    key={condition.id} 
                                    enabled={conditions.includes(condition.id)}
                                    {...condition}
                                />
                            ))}
                        </tbody>
                    </table>
                </Section>
                <Section>
                    <Calculation 
                        outputs={outputs}
                        setInput={setInput}
                        solveForInput={solveForInput}
                        solveForKey={solveForKey}
                    />
                </Section>
            </Horizontal>
        </Container>
    )
}