import styled from '@emotion/styled';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons';
import { IconButtonContainer } from '../../../../../shared/IconsSelector/IconButton';

type BuilderNavBarType = {
  timeTravelProps: TimeTravelProps;
  onExport: () => void;
};

export const BuilderNavBar: React.FC<BuilderNavBarType> = ({
  children,
  timeTravelProps,
  onExport,
}) => {
  return (
    <>
      <BuilderNavBarContainer>
        {children}
        <div className='inner'>
          <div className='buttons_container'>
            <BuilderButtons {...timeTravelProps} />
          </div>
          <button onClick={onExport}>Export</button>
        </div>
      </BuilderNavBarContainer>
    </>
  );
};

const BuilderNavBarContainer = styled.div`
  min-height: 40px;
  .inner {
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    position: fixed;
    background: white;
    z-index: 100;

    .buttons_container {
      display: flex;
      align-items: center;
      > * {
        margin-right: 10px;
      }
    }
  }
`;
type TimeTravelProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  undo: () => void;
  redo: () => void;
};

const BuilderButtons = ({
  hasPrevious,
  hasNext,
  undo,
  redo,
}: TimeTravelProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <IconButtonContainer disabled={!hasPrevious}>
        <IconArrowBackUp onClick={() => undo()} />
      </IconButtonContainer>
      <IconButtonContainer disabled={!hasNext}>
        <IconArrowForwardUp onClick={() => redo()} />
      </IconButtonContainer>
    </div>
  );
};
