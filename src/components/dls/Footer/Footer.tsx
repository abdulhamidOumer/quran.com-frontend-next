import QSimpleIcon from '../../../../public/icons/Q_simple.svg';

import styles from './Footer.module.scss';

import Link, { LinkVariant } from 'src/components/dls/Link/Link';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.iconContainer}>
      <QSimpleIcon />
    </div>
    <div>
      <div className={styles.title}>Read, study, and learn The Noble Quran.</div>
      <div className={styles.itemsContainer}>
        <div>
          <Link variant={LinkVariant.Primary} href="/privacy">
            Privacy
          </Link>
        </div>
        <div>
          <Link variant={LinkVariant.Primary} href="/about-us">
            About Us
          </Link>
        </div>
        <div>
          <Link variant={LinkVariant.Primary} href="/developers">
            Developers
          </Link>
        </div>
        {/* <div>
          <Link variant={LinkVariant.Primary} href="/terms">
            Terms
          </Link>
        </div> */}
      </div>
      <div className={styles.itemsContainer}>
        <div>
          <Link variant={LinkVariant.Primary} href="https://feedback.quran.com">
            Feedback
          </Link>
        </div>
        <div>
          <Link variant={LinkVariant.Primary} href="/support">
            Help
          </Link>
        </div>
        <div>
          <Link variant={LinkVariant.Primary} href="/sitemap.xml">
            Sitemap
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2021{' '}
        <Link href="https://quran.com" variant={LinkVariant.Highlight}>
          Quran.com
        </Link>
        . All Rights Reserved
      </div>
    </div>
  </div>
);

export default Footer;