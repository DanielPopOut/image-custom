import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { isEqual } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { IconButtonContainer } from 'src/modules/shared/IconsSelector/IconButton';
import { Template } from 'src/modules/templates/models/template.model';
import { TemplateContext } from '../contexts/TemplateContext';

export const LayerLevels = ({
  elements,
}: {
  elements: Template['elements'];
}) => {
  const { updateElementsZindex } = useContext(TemplateContext);
  const [state, setState] = useState({});

  const elementsData = Object.values(elements).map((element, index) => {
    const zIndex = +element.style.zIndex || 0;
    return {
      id: element.id,
      type: element.type,
      zIndex,
      zIndexScore: zIndex * 1000 + index,
    };
  });
  elementsData.sort((a, b) => {
    return +a.zIndexScore - b.zIndexScore;
  });

  const elementIdsOrdered = elementsData.map((item) => item.id);
  const calculateZindexMapping = (elementsIdsArray: string[]) => {
    return elementsIdsArray.reduce((finalObj, id, index) => {
      finalObj[id] = index;
      return finalObj;
    }, {} as Record<string, number>);
  };
  const currentZindexMapping = calculateZindexMapping(elementIdsOrdered);

  const updateElementZindex = (elementId: string, newPosition: number) => {
    const arrayWithoutThatElement = elementIdsOrdered.filter(
      (itemId) => itemId !== elementId,
    );
    arrayWithoutThatElement.splice(newPosition, 0, elementId);
    const zIndexMapping = calculateZindexMapping(arrayWithoutThatElement);
    setState(zIndexMapping);
  };

  useEffect(() => {
    if (!isEqual(currentZindexMapping, state)) {
      setState(currentZindexMapping);
    }
  }, [elements]);
  const [, cancel] = useDebounce(
    () => {
      if (!isEqual(currentZindexMapping, state)) {
        updateElementsZindex(state);
      }
    },
    200,
    [state],
  );
  const items = elementsData.map(({ type, id }, index) => {
    return (
      <div
        style={{
          padding: 5,
          borderBottom: '1px solid grey',
          minWidth: 200,
          display: 'flex',
          alignItems: 'center',
          fontSize: 12,
        }}
        onClick={() => {
          document.getElementById(id)?.focus();
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {index}: {type}
          <span style={{ fontSize: '0.8em' }}>{id}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButtonContainer
            style={{ padding: 0, cursor: 'pointer' }}
            title='dbclick to go front'
          >
            <IconChevronUp
              size={14}
              onClick={() => {
                updateElementZindex(id, index + 1);
              }}
              onDoubleClick={() => {
                updateElementZindex(id, elementsData.length);
              }}
            />{' '}
          </IconButtonContainer>
          <IconButtonContainer
            style={{ padding: 0, cursor: 'pointer' }}
            title='dbclick to go background'
          >
            <IconChevronDown
              size={14}
              onClick={() => updateElementZindex(id, Math.max(index - 1, 0))}
              onDoubleClick={() => {
                updateElementZindex(id, 0);
              }}
            />
          </IconButtonContainer>
        </div>
      </div>
    );
  });
  return (
    <div style={{ padding: 10 }}>
      <div style={{ fontWeight: 'bold' }}>Layers</div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {items}
      </div>
    </div>
  );
};
