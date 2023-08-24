import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      // To save route after rerender with i18
      navigate(location.pathname);
    });
  };
  const allLanguages = ['en', 'de', 'es'];
  const selectedLanguage = i18n.language;

  return (
    <div>
      Lang:{' '}
      {allLanguages.map(item => (
        <button key={item} disabled={item === selectedLanguage} onClick={() => changeLanguageHandler(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};
