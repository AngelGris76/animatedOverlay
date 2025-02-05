import { useEffect, useRef } from 'preact/hooks';
import MODAL_STATES from '../constants/modalState';

const AnimatedOverlay = ({
	className,
	extraClassNames,
	modalState,
	isAllwaysVisible,
	onClose,
	children,
}) => {
	const overlayRef = useRef(null);

	useEffect(() => {
		if (isAllwaysVisible) return;
		if (!overlayRef) return;

		let timerID;
		const overlayContainer = overlayRef.current;

		const transitionAction = (ev) => {
			if (ev.target !== overlayContainer) return;
			if (modalState.value === MODAL_STATES.toFinal) {
				modalState.value = MODAL_STATES.final;
				return;
			}
			if (modalState.value === MODAL_STATES.toInitial) {
				overlayContainer.classList.add(MODAL_STATES.initial);
				modalState.value = MODAL_STATES.initial;
				if (onClose) {
					onClose();
				}
				return;
			}
		};

		overlayContainer.addEventListener('transitionend', transitionAction);

		if (modalState.value === MODAL_STATES.toFinal) {
			overlayContainer.classList.remove(extraClassNames[MODAL_STATES.initial]);
			timerID = setTimeout(() => {
				overlayContainer.classList.add(extraClassNames[MODAL_STATES.final]);
			}, 10);
			return;
		}

		if (modalState.value === MODAL_STATES.toInitial) {
			overlayContainer.classList.remove(extraClassNames[MODAL_STATES.final]);
			return;
		}

		return () => {
			clearTimeout(timerID);
			overlayContainer.removeEventListener('transitionend', transitionAction);
		};
	}, [
		isAllwaysVisible,
		modalState,
		modalState.value,
		extraClassNames,
		onClose,
	]);

	let extraClass;

	if (!isAllwaysVisible) {
		extraClass =
			modalState.value === MODAL_STATES.initial
				? extraClassNames[MODAL_STATES.initial]
				: '';
	} else {
		extraClass = extraClassNames[MODAL_STATES.final];
	}

	return (
		<div class={`${className} ${extraClass}`} ref={overlayRef}>
			{children}
		</div>
	);
};

export default AnimatedOverlay;
