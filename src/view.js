/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { state, actions } = store( 'marce-recipe', {
	state: {
		scale: 1, // Default scale is 1x
				
		isButtonActive() {
			const context = getContext();
			return context.scale === state.scale;
		},
		
		// Get the scaled amount for an ingredient
		scaledAmount() {
			const context = getContext();
			const originalAmount = parseFloat(context.originalAmount) || 0;
			
			const scaledAmount = originalAmount * state.scale;
			
			if (Number.isInteger(scaledAmount)) {
				return scaledAmount.toString();
			} else {
				return scaledAmount.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
			}
		},
		
		get adjustedServings() {
			// Use Math.max to ensure we don't show 0 servings
			return Math.max(1, Math.round(state.baseServings * state.scale));
		}
	},
	
	actions: {
		setScale() {
			const context = getContext();
			state.scale = parseFloat(context.scale) || 1;
            console.log('Scale set to:', state.scale);
            console.log('Base servings:', state.baseServings);
            console.log('Adjusted servings:', state.adjustedServings);
		}
	}
});