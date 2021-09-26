import styled from '@emotion/styled';
import * as AllIcons from '@tabler/icons';
import { useState } from 'react';

const transformCamlCaseToWordLowercase = (stringToTransform: string) =>
  stringToTransform.replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`);
const ALL_ICONS_FORMATTED = Object.entries(AllIcons).map(([iconName, Icon]) => {
  return {
    iconName,
    searchIconName: transformCamlCaseToWordLowercase(iconName),
    Icon,
  };
});

const IconsSelectorContainer = styled.div`
  max-width: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: column;

  > .filter-div {
    padding: 0 10px;
    margin-bottom: 10px;
    .filter-input {
      min-height: 30px;
      width: 100%;
    }
  }

  .icons-div {
    overflow: auto;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    justify-content: center;
  }
`;

const IconContainer = styled.span`
  border: 1px solid transparent;
  padding: 5px;
  display: inline-flex;
  justify-content: center;
  &:hover {
    border: 1px solid #333;
  }
`;

export const IconsSelector: React.FC<{}> = ({ children }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const iconsToRender = searchInputValue
    ? ALL_ICONS_FORMATTED.filter(({ searchIconName }) =>
        searchIconName.includes(searchInputValue),
      )
    : ALL_ICONS_FORMATTED;
  return (
    <IconsSelectorContainer>
      <div className='filter-div'>
        <input
          className='filter-input'
          placeholder='Type to search...'
          onChange={(e) => setSearchInputValue(e.target.value)}
        ></input>
      </div>
      <div className='icons-div'>
        {iconsToRender.map(({ iconName, searchIconName, Icon }) => {
          return (
            <IconContainer title={searchIconName} key={iconName}>
              <Icon />
            </IconContainer>
          );
        })}
      </div>
    </IconsSelectorContainer>
  );
};
