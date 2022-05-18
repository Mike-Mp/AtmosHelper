import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function Nav() {
    const { t, i18n } = useTranslation();
    return (
        <nav className="app__header">
            <Link to="/">
                {t('Home')}
            </Link>
            <Link to="/settings">
                {t('Settings')}
            </Link>
        </nav>
    )
}