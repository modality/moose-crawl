import styled from 'styled-components';

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
    min-height: 100%;
    background: white;
    border: solid 1px cornflowerblue;
    border-width: 0 1px;
`;

const Horizontal = styled.div`
    display: flex;
    width: 100%;
`;

const Header = styled.div`
    padding: 2em 2em 0;
`

const Section = styled.section`
    width: 50%;
    padding: 2em;
`;

export function App(props) {
    const [allConditions, conditions, modifier, goldCostPerDay, setConditionEnabled] = useConditions();
    const [segmentObjects, incrementSegment, decrementSegment] = useTrack(modifier);
    const conditionsMultiplier = segmentObjects.find(s => s.selected).value;    
    const [outputs, solveForKey, setInput, solveForInput] = useSolver({
        baseMilesPerHour: 2.5,
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
                <h1>Moose Crawl Calculator</h1>
                <p>
                    Expedition planning tool for ICBMoose's hexcrawling rules.
                    Original hexcrawling rules by ICBMoose can be found <a href="https://docs.google.com/document/d/1OXq5BbhAblS1OicmxWaCW1Zd68aiO7SGWJvyJ46jY8s/edit">here</a>.
                    Software by Michael Hansen can be found <a href="https://github.com/modality/moose-crawl">here</a>.

                </p>
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
                    <p>Various conditions can increase or decrease the amount of time needed to travel a single hex.</p>
                    <table id="conditions-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th align="left">Condition</th>
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