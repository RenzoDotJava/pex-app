import { useState, useRef } from 'react';
import { SelectItemProps } from '../types/ui';

const useSearch = (initialList: SelectItemProps[]) => {
	const [filteredItems, setFilteredItems] = useState(initialList);
	const query = useRef('');

	const handleSearch = (text: string) => {
		if (!text) {
			setFilteredItems(initialList);
		} else {
			const filteredList = initialList.filter((item) => {
				return item.name.toLowerCase().includes(text.toLowerCase());
			});
			setFilteredItems(filteredList);
		}

		query.current = text;
	};

	const clear = () => {
		setFilteredItems(initialList);
		query.current = '';
	}

	return [query.current, handleSearch, filteredItems, clear] as const;
};

export default useSearch;
