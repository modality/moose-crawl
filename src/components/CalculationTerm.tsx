import styled from 'styled-components';

const EditableInput = styled.input`
    font-size: 2em;
    width: 80px;
    margin-right: 0.5em;
`;

const SolveButton = styled.button`
    opacity: 1;
`;

export default function CalculationTerm(props) {
    const {
        id,
        value,
        label,
        solvable,
        onSolve,
        onChange,
        selected,
    } = props;

    const editable = props.editable && !selected;
    const className = selected ? 'enabled' : '';

    return <tr>
        <td>
            {solvable &&
                <SolveButton
                    onClick={onSolve}
                    className={className}
                    disabled={selected}
                >
                    Solve
                </SolveButton>
            }
        </td>
        <td>
        <EditableInput
            type="number"
            min="0" max="1000" step="0.5"
            id={id}
            value={value}
            disabled={!editable}
            onChange={onChange}
        />
        </td>
        <td>
        <label htmlFor={id}>{label}</label>
        </td>
    </tr>
}
