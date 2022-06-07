import styled from 'styled-components';

const Bonus = styled.span`
    font-size: 1.2em;
    font-weight: bold;
`;
    
const Cost = styled.span`
`;

const Description = styled.p`
    font-size: 0.8em;
    font-style: italic;
    color: gray;
    margin: 0;
`;

export default function Condition(props) {
    const {
        id,
        name,
        description = '',
        bonus = 0,
        cost = 0,
        onChange,
    } = props;

    const bonusStr = bonus >= 0 ? `+${bonus}` : `${bonus}`
    let costStr = '';
    if (cost != 0) {
        costStr = `${cost}gp/day`;
    }

    return <tr>
        <td valign="top">
            <input id={`condition-${id}`} type="checkbox" onChange={onChange} />
        </td>
        <td valign="top">
            <label htmlFor={`condition-${id}`}>{name}</label>
            {description.length > 0 &&
                <Description>{description}</Description>
            }
        </td>
        <td valign="top" align="center">
            <Cost>{costStr}</Cost>
        </td>
        <td align="center" className='modifier'>
            <Bonus>{bonusStr}</Bonus>
        </td>
    </tr>;
}