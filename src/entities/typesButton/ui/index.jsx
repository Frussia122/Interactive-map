import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TypeButton, TypesWrapper } from './styled';
import routeTypes from '../models/routeTypes'; 

export const TypesButton = ({ currentRoute }) => {
    const [activeType, setActiveType] = useState(routeTypes[0].type);

    const handleType = (type) => {
        if (currentRoute) {
          setActiveType(type);
          currentRoute.model.setParams({
            routingMode: type,
          });
        }
      };

    return (
      <TypesWrapper>
        {routeTypes.map((type) => (
          <TypeButton
            key={type.id}
            onClick={(e) => handleType(type.type, e)}
            className={type.type === activeType ? 'activeType' : ''}
            >
          <FontAwesomeIcon
            icon={type.icon}
            className={type.type === activeType ? 'active' : ''}
          />
         </TypeButton>
        ))}
      </TypesWrapper>
    
    )
}