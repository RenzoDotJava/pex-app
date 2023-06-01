import {ExpoSecureStoreAdapter} from './storage';

export const langs = [
	{
		id: 1,
		name: 'English',
		code: 'en'
	},
	{
		id: 2,
		name: 'Español',
		code: 'es'
	}
];

export const setGlobalLanguage = async (i18n: any) => {
	const lang = await ExpoSecureStoreAdapter.getItem('pex-lang');
	if (lang) i18n.changeLanguage(lang);
};

export const changeLanguage = async (lang: string, i18n: any) => {
	if (lang === i18n.language) return;
	await ExpoSecureStoreAdapter.setItem('pex-lang', lang);
	i18n.changeLanguage(lang);
};
