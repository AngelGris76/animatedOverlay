# Animated Overlay

## Description

It use signal to determine where de overlay is visible or not. Also, it can be allways visible.
The component receive a series of props that control the state.

### Component

Only one component in the library  \<AnimatedOverlay /> 

#### Props description

* className : The basics styles of the overlay 
* extraClassName : An object format classNames containing style for hidden and visible states
* modalState: signal to control de modal state of the overlay
* isAllwaysVisible: determine where de overlay is allways visible or not
* onClose: action to ejecute after closing the modal
* children: every thing to be rendered inside the modal

### Constants to control de state

Only one constant as object to control de state of the overlay

MODAL_STATE

#### Properties description of MODAL_STATE

* initial: initial and non visible state
* toFinal: transitioned to visible state
* final: visible state
* toInitial : transitioned to non visible state

Normaly, you only need to set toFinal and toInitial states to control the overlay

## Examples

css file for overlay (app.module.css)

    .overlay {
      position: absolute;
	    top: 0;
	    left: -100vw;
	    width: 100vw;
	    height: 100vh;
	    background-color: hsla(0, 0%, 20%, 0.5);

	    transition: transform 1s;
    }

    .hidden {
	    display: none;
    }

    .final {
	    transform: translateX(100vw);
    }

app file

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