import { useSignal } from '@preact/signals';
import AnimatedOverlay from './components/AnimatedOverlay';
import Dialog from './components/Dialog';
import MODAL_STATES from './constants/modalState';
import style from './app.module.css';

export const App = () => {
	const modalStateSignal = useSignal(MODAL_STATES.initial);

	const overlayStates = {
		[MODAL_STATES.initial]: style.hidden,
		[MODAL_STATES.final]: style.final,
	};

	return (
		<>
			<p>esta es la app</p>
			<button
				type='button'
				onClick={() => {
					modalStateSignal.value = MODAL_STATES.toFinal;
				}}
			>
				mostrar
			</button>
			<AnimatedOverlay
				//isAllwaysVisible={true}
				modalState={modalStateSignal}
				className={style.overlay}
				extraClassNames={overlayStates}
				onClose={() => {
					console.log('se cerro la modal');
				}}
			>
				<Dialog
					onCancel={() => {
						modalStateSignal.value = MODAL_STATES.toInitial;
					}}
				/>
			</AnimatedOverlay>
		</>
	);
};
