import styled from 'styled-components';
import { termKeys, editableKeys, solvableKeys } from '../hooks/solver'
import CalculationTerm from "./CalculationTerm";

const Section = styled.section`
    padding: 0 1em;
`;

export default function Calculation(props) {
    const {
        outputs,
        setInput,
        solveForInput,
        solveForKey,
    } = props;

    return <div>
        <h2>Expedition Figures</h2>
        <p>The calculator can solve for speed, time, and distance based on the values of the other two.</p>
        <table id="calculation-table">
            <tbody>
            {termKeys.map((key) => (
                <CalculationTerm
                    key={key}
                    id={key}
                    value={outputs[key]}
                    label={key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}
                    editable={editableKeys.includes(key)}
                    selected={key == solveForKey}
                    solvable={solvableKeys.includes(key)}
                    onSolve={() => solveForInput(key)}
                    onChange={(event) => setInput(key, event.target.value)}
                />
            ))}
            </tbody>
        </table>
    </div>;
}