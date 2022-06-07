import styled from 'styled-components';

const Segment = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;
    border: solid 1px black;
    margin: 5px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    margin: 0;
    padding: 0;
    height: 16px;
`;
    
const Text = styled.div`
    text-align: center;
    font-size: 2em;
    line-height: 48px;
    height: 48px;
`;

const ArrowUp = styled.div`
    margin: 0 auto;
    width: 0; 
    height: 0; 
    border-left: 2em solid transparent;
    border-right: 2em solid transparent;
    border-bottom: 2em solid black;
`;

export default function TrackSegment(props) {
    const {
        text,
        increment,
        decrement,
        selected
    } = props;

    return <div>
        <Segment>
            <Button onClick={increment}>+</Button>
            <Text>{text}x</Text>
            <Button onClick={decrement}>-</Button>
        </Segment>
        {selected && <ArrowUp />}
    </div>;
}