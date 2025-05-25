import styles from './Footer.module.scss';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Image src="/images/logo-footer.svg" alt="Logo Ratos" width={60} height={60} />
        <div className={styles.socials}>
          <a href="https://www.instagram.com/allratos/" target='_blank'><Image src="/images/ico-instagram.svg" alt="Instagram" width={24} height={24} /></a>
          <a href="https://www.tiktok.com/@allratos" target='_blank'><Image src="/images/ico-tiktok.svg" alt="TikTok" width={24} height={24} /></a>
          {/* <a href="https://www.instagram.com/allratos/" target='_blank'><Image src="/images/ico-facebook.svg" alt="Facebook" width={24} height={24} /></a> */}
          <a href="https://www.linkedin.com/company/allratos/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BL2FfzScNTgG80mk2JMTSuQ%3D%3D" target='_blank'><Image src="/images/ico-linkedin.svg" alt="LinkedIn" width={24} height={24} /></a>
        </div>
      </div>
      <div className={styles.bottom}>
        <a href="#">Mentions légales</a>
        <a href="#">CGU</a>
        <a href="#">Politiques de remboursement</a>
        <span>©RATOS 2025</span>
      </div>
    </footer>
  );
}
