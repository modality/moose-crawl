import { useState } from 'react';
import { defaultConditions } from  '../lib/icewind';

export default function useConditions() {
    const [conditions, setConditions] = useState([]);
    const activeConditions = defaultConditions.filter(c => conditions.indexOf(c.id) > -1);
    const modifier = activeConditions.map(c => c.bonus || 0).reduce((accum, value) => accum + value, 0);
    const cost = activeConditions.map(c => c.cost || 0).reduce((accum, value) => accum + value, 0); 
    
    function setConditionEnabled(id, enabled) {
        if (conditions.indexOf(id) > -1 && !enabled) {
            const updatedConditions = conditions.filter((v) => v != id);
            setConditions(updatedConditions);
        } else if (conditions.indexOf(id) == -1 && enabled) {
            const updatedConditions = [...conditions, id];
            setConditions(updatedConditions);
        }
    }

    return [defaultConditions, conditions, modifier, cost, setConditionEnabled];
}
