import styled from '@emotion/styled';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ROUTES } from 'src/modules/shared/routes/ROUTES';
import { IconButtonContainer } from '../../../../../shared/IconsSelector/IconButton';

type BuilderNavBarType = {
  timeTravelProps: TimeTravelProps;
  ActionButtons: ReactNode;
  isSaving: boolean;
};

export const BuilderNavBar: React.FC<BuilderNavBarType> = ({
  children,
  timeTravelProps,
  ActionButtons,
  isSaving,
}) => {
  return (
    <>
      <BuilderNavBarContainer>
        {children}
        <div className='inner'>
          <div className='buttons_container'>
            <Link href={ROUTES.MY_TEMPLATES}>
              <div className='button'> My templates</div>
            </Link>
            <BuilderButtons {...timeTravelProps} />
            {isSaving && (
              <>
                <span
                  className='loader'
                  style={{ fontSize: 16, margin: 0, marginRight: 10 }}
                />
                <span>Saving...</span>
              </>
            )}
          </div>
          <div className='buttons_container'>{ActionButtons}</div>
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
