import styled from '@emotion/styled';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons';
import { IconButtonContainer } from '../../../../../shared/IconsSelector/IconButton';

type BuilderNavBarType = {
  timeTravelProps: TimeTravelProps;
  onExport: () => void;
  onPublish: () => void;
  isSaving: boolean;
};

export const BuilderNavBar: React.FC<BuilderNavBarType> = ({
  children,
  timeTravelProps,
  onExport,
  isSaving,
  onPublish,
}) => {
  return (
    <>
      <BuilderNavBarContainer>
        {children}
        <div className='inner'>
          <div className='buttons_container'>
            <BuilderButtons {...timeTravelProps} />
            {isSaving && (
              <>
                <span className='loader' style={{ fontSize: 16 }} />
                <span>Saving...</span>
              </>
            )}
          </div>
          <div className='buttons_container'>
            <button className='button primary' onClick={onPublish}>
              Publish
            </button>
            <button className='button' onClick={onExport}>
              Export
            </button>
          </div>
        </div>
      </BuilderNavBarContainer>
    </>
  );
};

const BuilderNavBarContainer = styled.div`
  min-height: 40px;
  border-bottom: 1px solid #aaa;
  overflow: hidden;
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    position: fixed;
    background: white;
    z-index: 100;
    height: '100%';
    max-width: 800px;

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
