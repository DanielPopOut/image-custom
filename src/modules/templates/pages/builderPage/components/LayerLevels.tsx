import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { useContext } from 'react';
import { Template } from 'src/modules/templates/models/template.model';
import { TemplateContext } from '../contexts/TemplateContext';

export const LayerLevels = ({
  elements,
}: {
  elements: Template['elements'];
}) => {
  const { updateElementsZindex } = useContext(TemplateContext);
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
  const updateElementZindex = (elementId: string, newPosition: number) => {
    const arrayWithoutThatElement = elementIdsOrdered.filter(
      (itemId) => itemId !== elementId,
    );
    arrayWithoutThatElement.splice(newPosition, 0, elementId);
    const zindexMapping = arrayWithoutThatElement.reduce(
      (finalObj, id, index) => {
        finalObj[id] = index;
        return finalObj;
      },
      {} as Record<string, number>,
    );
    updateElementsZindex(zindexMapping);
  };
  const items = elementsData.map(({ type, id }, index) => {
    return (
      <div
        style={{
          padding: 5,
          borderBottom: '1px solid grey',
          minWidth: 200,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          fontSize: 12,
        }}
        onClick={() => {
          document.getElementById(id)?.focus();
        }}
      >
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {index}: {type}
          <span style={{ fontSize: '0.8em' }}>{id}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconChevronUp
            size={14}
            onClick={() => updateElementZindex(id, index + 1)}
          />{' '}
          <IconChevronDown
            size={14}
            onClick={() => updateElementZindex(id, Math.max(index - 1, 0))}
          />
        </div>
      </div>
    );
  });
  return (
    <div style={{ padding: 10 }}>
      <div style={{ fontWeight: 'bold' }}>Layers</div>
      {items}
    </div>
  );
};
