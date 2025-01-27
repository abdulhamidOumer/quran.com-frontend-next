import React from 'react';

import useTranslation from 'next-translate/useTranslation';

import DonateButton from '../Fundraising/DonateButton';
import LearnMoreButton from '../Fundraising/DonateButton/LearnMoreButton';

import styles from './HomePageMessage.module.scss';

import Button, { ButtonShape, ButtonSize, ButtonVariant } from '@/dls/Button/Button';
import CloseIcon from '@/icons/close.svg';
import DonateButtonClickSource from '@/types/DonateButtonClickSource';
import LearnMoreClickSource from '@/types/LearnMoreClickSource';

type HomePageMessageProps = {
  title?: string;
  subtitle?: string;
  body?: React.ReactNode;
  onClose?: () => void;
};

const HomePageMessage = ({ title, subtitle, body, onClose }: HomePageMessageProps) => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{subtitle}</p>
      {body}

      <div className={styles.closeIcon}>
        <Button
          size={ButtonSize.Small}
          shape={ButtonShape.Circle}
          variant={ButtonVariant.Ghost}
          onClick={onClose}
          ariaLabel={t('aria.msg-close')}
        >
          <CloseIcon />
        </Button>
      </div>
      <div className={styles.ctaContainer}>
        <DonateButton source={DonateButtonClickSource.CTA_WELCOME_MESSAGE} />
        <LearnMoreButton source={LearnMoreClickSource.LEARN_MORE_WELCOME_MESSAGE} />
      </div>
    </div>
  );
};

export default HomePageMessage;
