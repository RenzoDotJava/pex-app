import {useState} from 'react';

type HookProps = {
	onOpen?: () => void;
	onClose?: () => void;
};

const useToggle = ({onOpen, onClose}: HookProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggler = () => {
		const nextIsOpen = !isOpen;
		setIsOpen(nextIsOpen);
		if (nextIsOpen) {
			onOpen && onOpen();
		} else {
			onClose && onClose();
		}
	};

	return [isOpen, toggler] as const;
};

export default useToggle;
